const fs = require('fs');

const content = fs.readFileSync('src/app/services/[...slug]/page.tsx', 'utf8');

let updatedContent = content.replace(
  'import HeroAction from "@/components/HeroAction";',
  'import HeroAction from "@/components/HeroAction";\nimport CustomSolutionPopup from "@/components/CustomSolutionPopup";\nimport WhatsAppIcon from "@/components/icons/WhatsAppIcon";\nimport type { LinkAction } from "@/types";\nimport type { ContactSubmissionContext } from "@/lib/contactSubmission";\n\nfunction ServiceAction({ action, className, context }: { action: LinkAction; className: string; context: ContactSubmissionContext }) {\n  if (action.kind === "popup" && action.popupId === "custom-quote") {\n    return (\n      <CustomSolutionPopup\n        source={context.section as any}\n        context={context}\n        trigger={\n          <button type="button" className={className}>\n            {action.type === "whatsapp" ? <WhatsAppIcon className="h-4 w-4" /> : null}\n            {action.text}\n          </button>\n        }\n      />\n    );\n  }\n\n  if (action.type === "whatsapp") {\n    return (\n      <a href="https://wa.me/918859366292" className={className} target="_blank" rel="noopener noreferrer">\n        <WhatsAppIcon className="h-4 w-4" />\n        {action.text}\n      </a>\n    );\n  }\n\n  return (\n    <Link href={action.href ?? "/contact-us"} className={className}>\n      {action.text}\n    </Link>\n  );\n}'
);

// Now replace HeroAction and ServiceFinalCtaAction usages INSIDE MainServiceTemplate
// HeroAction for hero
updatedContent = updatedContent.replace(
  /<HeroAction\s+key=\{idx\}\s+action=\{\{ \.\.\.action, className: baseClass \}\}\s+context=\{\{\s+page: "service",\s+route: `\/services\/\$\{slugPath\}`,\s+section: "hero",\s+trigger: action\.popupId \?\? action\.type,\s+\}\}\s+\/>/g,
  `<ServiceAction
                  key={idx}
                  action={action}
                  className={baseClass}
                  context={{
                    page: "service",
                    route: \`/services/\${slugPath}\`,
                    section: "hero",
                    trigger: action.popupId ?? action.type,
                  }}
                />`
);

// HeroAction for overview cta
updatedContent = updatedContent.replace(
  /<HeroAction\s+action=\{\{ \.\.\.data\.intro_section\.cta, className: 'btn-purple' \}\}\s+context=\{\{ page: "service", route: `\/services\/\$\{slugPath\}`, section: "overview", trigger: data\.intro_section\.cta\.popupId \?\? data\.intro_section\.cta\.type \}\}\s+\/>/g,
  `<ServiceAction
                    action={data.intro_section.cta}
                    className="btn-purple"
                    context={{ page: "service", route: \`/services/\${slugPath}\`, section: "overview", trigger: data.intro_section.cta.popupId ?? data.intro_section.cta.type }}
                  />`
);

// HeroAction for overview secondaryCta
updatedContent = updatedContent.replace(
  /<HeroAction\s+action=\{\{ \.\.\.data\.intro_section\.secondaryCta, className: 'btn-outline' \}\}\s+context=\{\{ page: "service", route: `\/services\/\$\{slugPath\}`, section: "overview", trigger: data\.intro_section\.secondaryCta\.popupId \?\? data\.intro_section\.secondaryCta\.type \}\}\s+\/>/g,
  `<ServiceAction
                    action={data.intro_section.secondaryCta}
                    className="btn-outline"
                    context={{ page: "service", route: \`/services/\${slugPath}\`, section: "overview", trigger: data.intro_section.secondaryCta.popupId ?? data.intro_section.secondaryCta.type }}
                  />`
);

// HeroAction for process cta
updatedContent = updatedContent.replace(
  /<HeroAction\s+action=\{\{ \.\.\.data\.process_section\.cta, className: 'btn-purple' \}\}\s+context=\{\{ page: "service", route: `\/services\/\$\{slugPath\}`, section: "process", trigger: data\.process_section\.cta\.popupId \?\? data\.process_section\.cta\.type \}\}\s+\/>/g,
  `<ServiceAction
                  action={data.process_section.cta}
                  className="btn-purple"
                  context={{ page: "service", route: \`/services/\${slugPath}\`, section: "process", trigger: data.process_section.cta.popupId ?? data.process_section.cta.type }}
                />`
);

// ServiceFinalCtaAction for final cta
updatedContent = updatedContent.replace(
  /<ServiceFinalCtaAction\s+key=\{idx\}\s+action=\{\{ \.\.\.action, className: baseClass \}\}\s+context=\{\{\s+page: "service",\s+route: `\/services\/\$\{slugPath\}`,\s+section: "final-cta",\s+trigger: action\.popupId \?\? action\.type,\s+\}\}\s+\/>/g,
  `<ServiceAction
                  key={idx}
                  action={action}
                  className={baseClass}
                  context={{
                    page: "service",
                    route: \`/services/\${slugPath}\`,
                    section: "final-cta",
                    trigger: action.popupId ?? action.type,
                  }}
                />`
);

fs.writeFileSync('src/app/services/[...slug]/page.tsx', updatedContent);

console.log("Successfully fixed ServiceAction mappings");
