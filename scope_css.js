const fs = require('fs');
const postcss = require('postcss');

const css = fs.readFileSync('src/app/portfolio/portfolio.css', 'utf8');

const plugin = postcss.plugin('scope-plugin', () => {
    return (root) => {
        root.walkRules(rule => {
            // Remove global tags that Next.js handles
            if (['html', 'body', 'nav', '.logo', '.logo-icon', '.logo-icon svg', '.logo-text', '.logo-text span', 
                '.nav-links', '.nav-links a', '.nav-links a:hover', '.nav-links .active', '.nav-r', '.nav-phone-num', 
                '.nav-phone-sub', '.nav-cta', '.nav-cta:hover', '.page-footer', '.page-footer span', 
                '.footer-links', '.footer-links a', '.footer-links a:hover'].includes(rule.selector)) {
                rule.remove();
                return;
            }

            // Remove specific media query rules
            if (rule.selector === 'nav .nav-links') {
                rule.remove();
                return;
            }

            // Don't scope keyframes or global resets
            if (rule.parent && rule.parent.name === 'keyframes') return;
            if (rule.selector === ':root' || rule.selector === '*, *::before, *::after') return;

            // Scope the rest
            rule.selectors = rule.selectors.map(selector => {
                if (selector.startsWith('.portfolio-page-main')) return selector;
                return `.portfolio-page-main ${selector}`;
            });
        });
    };
});

postcss([plugin]).process(css, { from: undefined }).then(result => {
    fs.writeFileSync('src/app/portfolio/portfolio.css', result.css);
    console.log("Successfully scoped CSS");
}).catch(err => {
    console.error(err);
});
