const fs = require('fs');

const pageContent = fs.readFileSync('src/app/services/[...slug]/page.tsx', 'utf8');

let newPage = pageContent;

// Remove CSS import
newPage = newPage.replace(/import "\.\/service-detail\.css";\n/g, "");

// Remove div wrapper and just keep main
newPage = newPage.replace(/<main>\s*<div className="service-detail-main">/, '<main className="bg-[#F8F9FF] text-[#1E1B4B] font-sans selection:bg-[#5B4FE9]/20">');
newPage = newPage.replace(/<\/div>\{\/\* End service-detail-main \*\/}/, '');
newPage = newPage.replace(/<div className="service-detail-main">/g, '');
newPage = newPage.replace(/<\/main>/, '</main>');
// But wait, there was a </div> before </main>. Let's do it carefully.
// Instead of simple replaces, let's just rewrite MainServiceTemplate from scratch.
