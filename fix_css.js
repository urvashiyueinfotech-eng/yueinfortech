const fs = require('fs');
const postcss = require('postcss');

const html = fs.readFileSync('new.html', 'utf8');
const match = html.match(/<style>([\s\S]*?)<\/style>/);
if (!match) process.exit(1);

let css = match[1];

// Update theme colors
css = css.replace(/--purple: #6d5dfc;/g, '--purple: #5B4FE9;');
css = css.replace(/--purple-2: #8a7cff;/g, '--purple-2: #7B72EE;');
css = css.replace(/--violet: #4f46e5;/g, '--violet: #4A3FD4;');
css = css.replace(/rgba\(109, 93, 252/g, 'rgba(91, 79, 233');
css = css.replace(/--navy: #070b2f;/g, '--navy: #0D1035;');
css = css.replace(/--navy-2: #0f1447;/g, '--navy-2: #111437;');
css = css.replace(/--text: #11142d;/g, '--text: #1E1B4B;');
css = css.replace(/rgba\(17, 20, 45/g, 'rgba(13, 16, 53');
css = css.replace(/--muted: #667085;/g, '--muted: #4B5563;');

const plugin = postcss.plugin('scope-plugin', () => {
    return (root) => {
        root.walkRules(rule => {
            // Ignore keyframes inner rules
            if (rule.parent && rule.parent.type === 'atrule' && rule.parent.name === 'keyframes') return;
            
            if (rule.selector === ':root') {
                rule.selector = '.services-page-main';
                return;
            }
            if (rule.selector.includes('*')) {
                rule.remove();
                return;
            }
            if (rule.selector === 'body' || rule.selector === 'html') {
                rule.selector = '.services-page-main';
                return;
            }

            // Prefix other selectors with .services-page-main
            rule.selector = rule.selectors.map(s => {
                if (s === '.services-page-main') return s;
                return `.services-page-main ${s}`;
            }).join(', ');
        });
    };
});

postcss([plugin()]).process(css, { from: undefined }).then(result => {
    fs.writeFileSync('src/app/services/services.css', result.css);
    console.log("CSS properly scoped and generated!");
});
