const fs = require('fs');
let content = fs.readFileSync('src/app/services/[...slug]/page.tsx', 'utf8');

// Replace the first block (around line 340)
content = content.replace(/{data\.faq_section\?\.questions\?\.length \? \(\n\s*<section className="px-\[5%\] py-\[90px\] bg-white">\n\s*<div className="text-\[0\.73rem\] font-bold tracking-\[0\.1em\] uppercase text-\[#5B4FE9\] mb-3">Common Questions<\/div>\n\s*<h2 className="text-\[clamp\(2rem,3\.5vw,3rem\)\] font-extrabold text-\[#1E1B4B\] tracking-\[-0\.02em\] leading-\[1\.15\] mb-\[52px\] \[\&>span\]:text-\[#5B4FE9\]" dangerouslySetInnerHTML={{ __html: data\.faq_section\.heading\.replace\('Questions', '<span>Questions<\/span>'\) }} \/>\n\s*<FAQSection data={data\.faq_section} \/>\n\s*<\/section>\n\s*\) : null}/g,
  `{data.faq_section?.questions?.length ? (
        <div className="bg-white w-full">
          <FAQSection data={data.faq_section} />
        </div>
      ) : null}`
);

// Replace the second block (around line 504)
content = content.replace(/{data\.faq_section\?\.questions\?\.length \? \(\n\s*<section className="px-\[5%\] py-\[90px\] bg-white">\n\s*<div className="text-\[0\.73rem\] font-bold tracking-\[0\.1em\] uppercase text-\[#5B4FE9\] mb-3">Common Questions<\/div>\n\s*<h2 className="text-\[clamp\(2rem,3\.5vw,3rem\)\] font-extrabold text-\[#1E1B4B\] tracking-\[-0\.02em\] leading-\[1\.15\] mb-\[52px\] \[\&>span\]:text-\[#5B4FE9\]" dangerouslySetInnerHTML={{ __html: data\.faq_section\.heading\.replace\('Questions', '<span>Questions<\/span>'\) }} \/>\n\s*<FAQSection data={data\.faq_section} \/>\n\s*<\/section>\n\s*\) : null}/g,
  `{data.faq_section?.questions?.length ? (
        <div className="bg-white w-full">
          <FAQSection data={data.faq_section} />
        </div>
      ) : null}`
);

fs.writeFileSync('src/app/services/[...slug]/page.tsx', content);
