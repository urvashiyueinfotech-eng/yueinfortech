const fs = require('fs');
const postcss = require('postcss');

const html = fs.readFileSync('YueInfotech-Portfolio-BrandTheme.html', 'utf8');
const match = html.match(/<style>([\s\S]*?)<\/style>/);
if (!match) {
    console.error("No <style> tag found.");
    process.exit(1);
}

let css = match[1];

// Remove global styles that Next.js layout handles
css = css.replace(/html\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/body\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/nav\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.logo\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.logo-icon\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.logo-icon\s+svg\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.logo-text\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.logo-text\s+span\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.nav-links\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.nav-links\s+a\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.nav-links\s+a:hover\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.nav-r\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.nav-phone-num\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.nav-phone-sub\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.nav-cta\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.nav-cta:hover\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.page-footer\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.page-footer\s+span\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.footer-links\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.footer-links\s+a\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.footer-links\s+a:hover\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/nav\s+\.nav-links\s*\{\s*display:\s*none;\s*\}/g, '');

const plugin = postcss.plugin('scope-plugin', () => {
    return (root) => {
        root.walkRules(rule => {
            if (rule.parent && rule.parent.name === 'keyframes') return; // Don't prefix keyframes

            // Exclude global resets
            if (rule.selector === ':root' || rule.selector === '*, *::before, *::after' || rule.selector === 'html' || rule.selector === 'body') {
                return;
            }

            rule.selectors = rule.selectors.map(selector => {
                if (selector.startsWith('.portfolio-page-main')) return selector;
                return `.portfolio-page-main ${selector}`;
            });
        });
    };
});

postcss([plugin]).process(css, { from: undefined }).then(result => {
    fs.writeFileSync('src/app/portfolio/portfolio.css', result.css);
    console.log("Successfully extracted and scoped CSS to src/app/portfolio/portfolio.css");
}).catch(err => {
    console.error("PostCSS Error:", err.message);
});
