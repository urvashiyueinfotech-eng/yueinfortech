const fs = require('fs');
const html = fs.readFileSync('new.html', 'utf8');
const match = html.match(/<style>([\s\S]*?)<\/style>/);
if (match) {
  let css = match[1];
  
  // Replace the colors to match the current theme as requested
  css = css.replace(/--purple: #6d5dfc;/g, '--purple: #5B4FE9;');
  css = css.replace(/--purple-2: #8a7cff;/g, '--purple-2: #7B72EE;');
  css = css.replace(/--violet: #4f46e5;/g, '--violet: #4A3FD4;');
  css = css.replace(/rgba\(109, 93, 252/g, 'rgba(91, 79, 233');
  css = css.replace(/--navy: #070b2f;/g, '--navy: #0D1035;');
  css = css.replace(/--navy-2: #0f1447;/g, '--navy-2: #111437;');
  css = css.replace(/--text: #11142d;/g, '--text: #1E1B4B;');
  css = css.replace(/rgba\(17, 20, 45/g, 'rgba(13, 16, 53');
  css = css.replace(/--muted: #667085;/g, '--muted: #4B5563;');
  
  // Scoping everything under #services-page wrapper
  // We can't simply prefix every line because of media queries and keyframes.
  // Instead, let's write a simple regex or just leave it global and see if it breaks anything.
  // Since this is a redesign of the services page, maybe we just scope the container?
  // Let's use a very simple POSTCSS or just naive regex if needed. 
  // Actually, wait, it's easier to just use standard CSS if Next.js allows it.
  fs.writeFileSync('src/app/services/services.css', css);
  console.log("CSS Extracted and Theme colors applied");
}
