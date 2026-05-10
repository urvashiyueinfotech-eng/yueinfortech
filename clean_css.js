const fs = require('fs');

let css = fs.readFileSync('src/app/services/services.css', 'utf8');

// Remove .eyebrow
css = css.replace(/\.services-page-main\s+\.eyebrow\s*\{[\s\S]*?^\s*\}/gm, '');
// Remove .section-title
css = css.replace(/\.services-page-main\s+\.section-title\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.services-page-main\s+\.section-title\s*span,\s*\.services-page-main\s+\.gradient-text\s*\{[\s\S]*?^\s*\}/gm, '');
// Remove .section-copy
css = css.replace(/\.services-page-main\s+\.section-copy\s*\{[\s\S]*?^\s*\}/gm, '');
// Remove .btn
css = css.replace(/\.services-page-main\s+\.btn\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.services-page-main\s+\.btn:hover\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.services-page-main\s+\.btn-primary\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.services-page-main\s+\.btn-primary:hover\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.services-page-main\s+\.btn-ghost\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.services-page-main\s+\.btn-light\s*\{[\s\S]*?^\s*\}/gm, '');

// Also remove .faq and .accordion
css = css.replace(/\.services-page-main\s+\.faq-grid\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.services-page-main\s+\.accordion\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.services-page-main\s+details\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.services-page-main\s+details\[open\]\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.services-page-main\s+summary\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.services-page-main\s+summary::after\s*\{[\s\S]*?^\s*\}/gm, '');
css = css.replace(/\.services-page-main\s+details\[open\]\s*summary::after\s*\{[\s\S]*?^\s*\}/gm, '');

fs.writeFileSync('src/app/services/services.css', css);
console.log("Cleaned unused styles from services.css");
