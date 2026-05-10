const fs = require('fs');
const html = fs.readFileSync('YueInfotech-Portfolio-BrandTheme.html', 'utf8');
const match = html.match(/<style>([\s\S]*?)<\/style>/);
if (match) {
    fs.writeFileSync('src/app/portfolio/portfolio.css', match[1]);
    console.log("Extracted raw CSS");
}
