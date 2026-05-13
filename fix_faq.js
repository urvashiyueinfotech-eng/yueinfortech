const fs = require('fs');

let content = fs.readFileSync('src/app/services/[...slug]/page.tsx', 'utf8');

const oldFaq1 = `      {/* ── FAQ ── */}
      {data.faq_section?.questions?.length ? (
        <section className="px-[5%] py-[90px] bg-white">
          <div className="text-[0.73rem] font-bold tracking-[0.1em] uppercase text-[#5B4FE9] mb-3">Common Questions</div>
          <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-[#1E1B4B] tracking-[-0.02em] leading-[1.15] mb-[52px] [&>span]:text-[#5B4FE9]" dangerouslySetInnerHTML={{ __html: data.faq_section.heading.replace('Questions', '<span>Questions</span>') }} />
          <ServiceDetailFaq questions={data.faq_section.questions} />
        </section>
      ) : null}`;

const newFaq = `      {/* ── FAQ ── */}
      {data.faq_section?.questions?.length ? (
        <div className="bg-white w-full">
          <FAQSection data={data.faq_section} />
        </div>
      ) : null}`;

content = content.replace(oldFaq1, newFaq);
content = content.replace(oldFaq1, newFaq);

// Also remove import ServiceDetailFaq from "./ServiceDetailFaq";
content = content.replace(/import ServiceDetailFaq from "\.\/ServiceDetailFaq";\n/, '');

fs.writeFileSync('src/app/services/[...slug]/page.tsx', content);
