const fs = require('fs');

let content = fs.readFileSync('src/app/services/[...slug]/page.tsx', 'utf8');
content = content.replace(/data\.process_section\.steps\.length/g, "data.process_section!.steps.length");

fs.writeFileSync('src/app/services/[...slug]/page.tsx', content);
