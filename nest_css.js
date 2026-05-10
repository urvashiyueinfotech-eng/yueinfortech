const fs = require('fs');
let css = fs.readFileSync('src/app/services/services.css', 'utf8');

// Move :root variables into .services-page-main
css = css.replace(/:root\s*\{([\s\S]*?)\}/, '.services-page-main {\n$1\n}');

// Remove universal selector because it conflicts heavily globally
css = css.replace(/\*\s*\{[\s\S]*?\}/, '');

// For html and body, merge them into .services-page-main or remove
css = css.replace(/html\s*\{[\s\S]*?\}/, '');
css = css.replace(/body\s*\{([\s\S]*?)\}/, '.services-page-main {\n$1\n}');

// Now wrap everything else inside .services-page-main?
// Actually, since Next.js supports standard CSS nesting, let's just create a new file where we put `.services-page-main {` at the top and `}` at the bottom.
// BUT we have to be careful with `@keyframes` and `@media`. In CSS nesting, `@media` works inside selectors, but `@keyframes` DOES NOT! `@keyframes` must be at the root.

// Since there are only a few keyframes, let's extract them.
const keyframes = [];
css = css.replace(/@keyframes\s+[^{]+\s*\{[\s\S]*?^\s*\}/gm, (match) => {
    keyframes.push(match);
    return '';
});

// Extract media queries to put them outside? No, media queries work perfectly inside nested CSS!

const finalCss = `
${keyframes.join('\n\n')}

.services-page-main {
  ${css}
}
`;

fs.writeFileSync('src/app/services/services.css', finalCss);
console.log("CSS nested successfully!");
