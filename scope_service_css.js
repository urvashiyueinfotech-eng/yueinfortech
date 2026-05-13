const fs = require('fs');
const postcss = require('postcss');

const html = fs.readFileSync('YueInfotech-DigitalMarketing-Revised-v3.html', 'utf8');
const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);

if (!cssMatch) {
    console.error('No CSS found');
    process.exit(1);
}

const css = cssMatch[1];

const plugin = postcss.plugin('scope-plugin', () => {
    return (root) => {
        root.walkRules(rule => {
            // Remove global tags that Next.js handles
            if (['html', 'body', 'nav', '.nav-logo', '.nav-logo-icon', '.nav-logo-icon svg', '.nav-logo-text', '.nav-logo-text span', 
                '.nav-links', '.nav-links a', '.nav-links a:hover', '.nav-right', '.nav-phone', '.nav-phone-num', 
                '.nav-phone-sub', '.nav-cta', '.nav-cta:hover', '.page-footer', '.pf-copy', 
                '.pf-links', '.pf-links a', '.pf-links a:hover'].includes(rule.selector)) {
                rule.remove();
                return;
            }

            // Remove specific media query rules that match global components
            if (rule.selector === 'nav .nav-links') {
                rule.remove();
                return;
            }

            // Don't scope keyframes or global resets
            if (rule.parent && rule.parent.name === 'keyframes') return;
            if (rule.selector === ':root' || rule.selector === '*, *::before, *::after') return;

            // Scope the rest
            rule.selectors = rule.selectors.map(selector => {
                if (selector.startsWith('.service-detail-main')) return selector;
                return `.service-detail-main ${selector}`;
            });
        });
    };
});

postcss([plugin]).process(css, { from: undefined }).then(result => {
    const dir = 'src/app/services/[...slug]';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(`${dir}/service-detail.css`, result.css);
    console.log("Successfully scoped CSS");
}).catch(err => {
    console.error(err);
});
