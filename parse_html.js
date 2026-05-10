const fs = require('fs');
const html = fs.readFileSync('new.html', 'utf8');
const mainMatch = html.match(/<main>([\s\S]*?)<\/main>/);
if (mainMatch) {
  fs.writeFileSync('main_content.html', mainMatch[0]);
  console.log("Main content extracted");
}
