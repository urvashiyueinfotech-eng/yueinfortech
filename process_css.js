const fs = require('fs');
let css = fs.readFileSync('src/app/services/services.css', 'utf8');

// Replace :root with .services-page-main
css = css.replace(/:root/g, '.services-page-main');

// Replace body, html with .services-page-main
css = css.replace(/body\s*\{/g, '.services-page-main {');
css = css.replace(/html\s*\{/g, '.services-page-main {');
// Remove * { ... } as it breaks global styles heavily
css = css.replace(/\*,\s*\*\s*::before,\s*\*\s*::after\s*\{[\s\S]*?\}/g, '');
css = css.replace(/\*\s*\{[\s\S]*?\}/g, '');

// Now wrap everything else? Actually, Next.js CSS nesting:
// We can just wrap all rules in `.services-page-main { ... }` EXCEPT the custom properties that we already replaced.
// But writing a robust AST parser is better.
// Let's use `postcss` since it's definitely in node_modules!
