import Image from 'next/image';
import type { ReactNode } from 'react';
import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';

type ServiceColor = 'blue' | 'green' | 'purple' | 'pink' | 'cyan';
type StepColor = 'bg-indigo-600' | 'bg-purple-600' | 'bg-blue-600' | 'bg-pink-600' | 'bg-cyan-600';

type AboutServiceCard = {
  icon: ReactNode;
  title: string;
  colorClass: ServiceColor;
  description: string;
};

type AboutStep = {
  number: string;
  title: string;
  desc: string;
  color: StepColor;
};

type AboutValue = {
  title: string;
  desc: string;
  icon: ReactNode;
};

const ABOUT_SERVICE_CARDS: AboutServiceCard[] = [
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>,
    title: "Web Design & Development",
    colorClass: "blue",
    description: "High-performance websites engineered for speed, technical SEO integrity, scalability, and conversion optimization.",
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>,
    title: "SEO & Search Visibility Engineering",
    colorClass: "green",
    description: "Enterprise SEO, AEO, GEO, SXO, and structured data systems built to strengthen authority and convert high-intent traffic into revenue.",
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6 3 3 0 000 6v6a1 1 0 001 1h1v4h-3a2 2 0 00-2-2v-3.28"></path>,
    title: "Digital Marketing & Paid Growth",
    colorClass: "purple",
    description: "Performance-driven acquisition systems integrating organic visibility and paid media for predictable ROI.",
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>,
    title: "Content & Authority Systems",
    colorClass: "pink",
    description: "Strategic messaging, structured content, and thought leadership frameworks built for search credibility and engagement.",
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>,
    title: "IT & Infrastructure",
    colorClass: "cyan",
    description: "Secure cloud hosting, cybersecurity, monitoring, and scalable architecture designed for uptime and business continuity.",
  },
];

const ABOUT_STEPS: AboutStep[] = [
  { number: '1', title: 'Analyze', desc: ' We evaluate business goals, competitive landscape, search opportunity, and infrastructure readiness.', color: 'bg-indigo-600' },
  { number: '2', title: 'Strategize', desc: 'We design integrated SEO, UX, content, and infrastructure frameworks aligned with measurable growth objectives.', color: 'bg-purple-600' },
  { number: '3', title: 'Execute', desc: 'We build and deploy digital systems with technical precision.', color: 'bg-blue-600' },
  { number: '4', title: 'Scale', desc: 'We refine visibility, engagement, and conversions through continuous data analysis.', color: 'bg-pink-600' },
  { number: '5', title: 'Support', desc: 'Ongoing optimization, monitoring, and security ensure sustained performance.', color: 'bg-cyan-600' },
];

const ABOUT_TRUST_POINTS = [
  'Operating since 2018',
  'Full-stack digital & IT expertise',
  'Authority-focused, data-backed strategies',
  'AI-era optimization capabilities (AEO • GEO • SXO)',
  'Custom-built digital ecosystems — never generic templates',
  'Transparent reporting & measurable growth',
] as const;

const ABOUT_VALUES: AboutValue[] = [
  {
    title: 'Integrity & Transparency',
    desc: 'We believe in honest communication and ethical execution.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />,
  },
  {
    title: 'Innovation & Improvement',
    desc: 'We continuously improve using new tools, frameworks, and AI systems.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />,
  },
  {
    title: 'Client-Centered Approach',
    desc: 'Your goals shape our strategy. Your success drives our success.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  },
];

type IndustryItem = {
  name: string;
  icon: ReactNode;
};

const ABOUT_INDUSTRIES: IndustryItem[] = [
  {
    name: 'SaaS & Tech',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /> // Cloud
  },
  {
    name: 'E-commerce',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /> // Shopping Bag
  },
  {
    name: 'Healthcare',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /> // Heart
  },
  {
    name: 'Real Estate',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> // Home
  },
  {
    name: 'Education',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /> // Academic Cap
  },
  {
    name: 'Local Business',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> // Storefront/Building
  },
  {
    name: 'B2B Enterprises',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> // Briefcase
  },
];

const YEARS_OF_EXPERIENCE = new Date().getFullYear() - 2018;

export default function AboutUs() {
  return (
    <main className="font-sans text-slate-600 antialiased bg-slate-50 min-h-screen">
      
      {/* Navbar Placeholder - Assuming you have a Layout, but adding this just in case you need a standalone header */}
      {/* <div className="fixed w-full z-50 top-0 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
              <span className="font-bold text-xl text-slate-800">Yue<span className="text-indigo-600">Infotech</span></span>
          </div>
      </div> */}

      <PageHero
        title="About Us"
        backgroundImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1920"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "about-us", href: "/about-us" }
        ]}
      />


      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="z-10">
              <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6 border border-indigo-100">
                Since 2018
              </span>
              <div className="mb-6">
                <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  About Yue Infotech
                </h1>
                <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    Your Digital Growth Partner Since 2018
                  </span>
                </h2>
              </div>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Yue Infotech is a full-stack digital growth agency delivering enterprise SEO, AI visibility engineering, high-performance web development, performance marketing, and secure IT infrastructure. Since 2018, we've helped businesses build scalable digital systems engineered to increase authority, accelerate growth, and generate measurable revenue
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#services" className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30">
                  Explore Services
                </Link>
                <Link href="#story" className="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-lg font-semibold hover:bg-slate-50 transition">
                  Talk with a Strategist 
                </Link>
              </div>
            </div>
            
            {/* Abstract Visual */}
            <div className="relative lg:block">
              {/* Blobs using standard Tailwind colors */}
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
              
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Team working at Yue Infotech"
                width={800}
                height={960}
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="relative rounded-2xl shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition duration-500 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:-translate-y-1 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
              To architect secure, scalable, and performance-driven digital systems that deliver sustainable business growth. We focus on long-term visibility, authority, and conversion — not short-term marketing spikes.
              </p>
            </div>
            
            {/* Vision */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:-translate-y-1 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">
              To become a globally trusted partner for digital transformation and AI-era search visibility. Innovation, technical precision, transparency, and measurable performance guide everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Office culture"
                  width={800}
                  height={960}
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="rounded-2xl shadow-xl grayscale hover:grayscale-0 transition duration-500 w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-600 hidden sm:block">
                  <p className="text-4xl font-bold text-slate-900">{YEARS_OF_EXPERIENCE}+</p>
                  <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider">Years of Experience</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story (Founded in 2018)</h2>
              <p className="text-slate-600 mb-4">
              Yue Infotech began in 2018 with one core belief: <strong className="text-indigo-600">Digital growth should be strategic, measurable, and scalable.</strong>
              </p>
              <p className="text-slate-600 mb-6">
              What started with website development for local businesses evolved into delivering enterprise-level digital ecosystems for B2B brands, ecommerce companies, and global organizations.
              </p>
              <p className="text-slate-600 mb-6">As search shifted toward AI-driven discovery systems, we integrated AEO, GEO, SXO, structured data frameworks, and infrastructure engineering into our growth model.</p>
              <div className="mt-8">
                <h4 className="font-bold text-slate-900 mb-4">We don’t run isolated campaigns.</h4>
                <p className="text-slate-600">
                We build integrated digital systems designed for authority, acquisition, and sustained expansion.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/contact-us"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-center font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700 sm:w-auto"
                >
                  Lets Connect To Know More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Today */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div>
              <span className="text-indigo-600 font-semibold tracking-wide uppercase text-sm mb-2 block">
                  Our Core DNA
              </span>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Who We Are Today</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We are strategists, developers, SEO engineers, marketers, and infrastructure specialists working together to deliver:
              </p>
              
              {/* Highlight Box for Concluding Statement */}
              <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-xl shadow-sm">
                <p className="text-slate-700 font-medium leading-relaxed">
                  Our approach bridges marketing and engineering — ensuring growth is technically sound, commercially aligned, and future-ready.
                </p>
              </div>
            </div>

            {/* List of Deliverables */}
            <div className="space-y-4">
              {[
                "Technical search visibility",
                "Conversion-driven digital experiences",
                "Performance marketing systems",
                "Authority-driven content",
                "Secure cloud architecture"
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    <svg className="w-5 h-5 text-indigo-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-slate-800 font-semibold">{item}</span>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </section> 

       {/* Mid-Page CTA Banner */}
      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-indigo-600 rounded-3xl p-8 md:p-12 lg:p-16 text-center shadow-2xl overflow-hidden">
            
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-indigo-900 opacity-20 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Discuss Your Growth Strategy?
              </h2>
              <p className="text-lg text-indigo-100 mb-10 leading-relaxed">
                We’ll assess your current digital position and outline a roadmap designed for scalable revenue growth.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 flex-wrap">
                
                {/* Call Now Button */}
                <a 
                  href="tel:+918859366292" 
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-white text-indigo-700 rounded-full font-bold hover:bg-indigo-50 hover:scale-105 transition-all shadow-lg"
                >
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call: +91 8859366292
                </a>

                {/* Consult Button */}
                <Link 
                  href="/contact-us" 
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-indigo-800 text-white border border-indigo-500 rounded-full font-bold hover:bg-indigo-700 hover:scale-105 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Free Consultation
                </Link>

                {/* WhatsApp Button */}
                <a 
                  href="https://wa.me/918859366292" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-[#25D366] text-white rounded-full font-bold hover:bg-[#20bd5a] hover:scale-105 transition-all shadow-lg shadow-[#25D366]/20"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2z"/>
                  </svg>
                  Chat on WhatsApp
                </a>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-indigo-600 font-semibold tracking-wide uppercase">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">Complete Digital Solutions</h2>
            <p className="text-slate-500">For Every Stage of Growth</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ABOUT_SERVICE_CARDS.map((service) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                colorClass={service.colorClass}
                description={service.description}
              />
            ))}
            
            {/* CTA Card */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-6 rounded-xl flex flex-col justify-center items-center text-center text-white">
              <h3 className="text-xl font-bold mb-2">Need a custom solution?</h3>
              <p className="text-sm text-indigo-200 mb-4">Let's discuss your project.</p>
              <Link href="/services" className="inline-block px-6 py-2 bg-white text-indigo-900 rounded-full font-bold text-sm hover:bg-indigo-50 transition">
                Explore All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Work</h2>
            <div className="h-1 w-20 bg-indigo-600 mx-auto rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
             {ABOUT_STEPS.map((step) => (
               <Step key={step.title} number={step.number} title={step.title} desc={step.desc} color={step.color} />
             ))}
          </div>
        </div>
      </section>

      {/* Why Us & Industries */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Why Us */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Why Clients Trust Us</h2>
              <ul className="space-y-4">
                {ABOUT_TRUST_POINTS.map((item) => (
                  <li key={item} className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Values */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Our Values</h2>
              <div className="grid grid-cols-1 gap-8">
                {ABOUT_VALUES.map((value) => (
                  <ValueItem key={value.title} title={value.title} desc={value.desc} icon={value.icon} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Industries Badge Cloud */}
          {/* Improved Industries Grid */}
          <div className="mt-20 pt-16 border-t border-slate-200">
            <div className="text-center mb-10">
              <span className="text-indigo-600 font-semibold tracking-wide uppercase text-sm block mb-2">
                Our Expertise
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Industries We Serve</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {ABOUT_INDUSTRIES.map((ind) => (
                <div 
                  key={ind.name} 
                  className="group flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-slate-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 cursor-default"
                >
                  <div className="w-12 h-12 mb-3 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 group-hover:scale-110 transition-transform duration-300">
                     {/* Dynamic Icon */}
                     <svg className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {ind.icon}
                     </svg>
                  </div>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-700 transition-colors text-center">
                    {ind.name}
                  </span>
                </div>
              ))}
              
              {/* "And More" Card to balance the 8-item grid if you add/remove items */}
              {ABOUT_INDUSTRIES.length % 2 !== 0 && ABOUT_INDUSTRIES.length % 4 !== 0 && (
                 <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                   <span className="text-sm font-medium text-slate-500">And many more...</span>
                 </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-indigo-900 text-white relative overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"></div>
      
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          Let’s Build Something That Grows With You
        </h2>
        
        <p className="text-xl text-indigo-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Whether you need a website, SEO strategy, branding, content, or secure IT infrastructure — we’re here to help you grow.
        </p>

        {/* --- IMPROVED BUTTONS --- */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
          
          {/* Button 1: Primary (Calendar Icon) */}
          <button className="group relative px-8 py-4 bg-white text-indigo-950 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all duration-300 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.5)] hover:-translate-y-1 w-full sm:w-auto">
            <span className="flex items-center justify-center gap-3">
              {/* Calendar Icon */}
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Book Free Consultation
            </span>
          </button>

          {/* Button 2: Secondary (Glassmorphism + WhatsApp Icon) */}
          <button className="group px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-semibold text-lg hover:bg-white/10 hover:border-green-500/30 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-3 w-full sm:w-auto">
             {/* Icon Container with Glow */}
             <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2z"/></svg>
             </div>
             <span className="group-hover:text-green-300 transition-colors">Chat on WhatsApp</span>
          </button>

        </div>

      </div>
    </section>

    </main>
  );
}

// --- Subcomponents for Cleanliness ---

const ServiceCard = ({
  icon,
  title,
  description,
  colorClass,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  colorClass: ServiceColor;
}) => {
    // Mapping colors to Tailwind classes dynamically can be tricky with JIT, 
    // so we handle specific cases or use safe-listing. 
    // For this mockup, I'll stick to a simple mapping or just pass style props.
    // To keep it simple for copy-paste, I'll default to Indigo/Blue mix if dynamic fails, 
    // but here I use standard group-hover logic.
    
    const colorMap: Record<ServiceColor, string> = {
        blue: "text-blue-600 bg-blue-50 group-hover:bg-blue-600",
        green: "text-green-600 bg-green-50 group-hover:bg-green-600",
        purple: "text-purple-600 bg-purple-50 group-hover:bg-purple-600",
        pink: "text-pink-600 bg-pink-50 group-hover:bg-pink-600",
        cyan: "text-cyan-600 bg-cyan-50 group-hover:bg-cyan-600",
    };

    const activeColor = colorMap[colorClass];

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-xl transition duration-300 group">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition group-hover:text-white ${activeColor}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {icon}
                </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-sm leading-7 text-slate-600">{description}</p>
        </div>
    );
};

const Step = ({ number, title, desc, color }: AboutStep) => (
    <div className="relative p-4">
        <div className={`w-16 h-16 ${color} rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 border-4 border-slate-800`}>
            {number}
        </div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm text-slate-400">{desc}</p>
    </div>
);

const ValueItem = ({ title, desc, icon }: AboutValue) => (
    <div className="flex">
        <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-10 w-10 rounded-md bg-indigo-600 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {icon}
                </svg>
            </div>
        </div>
        <div className="ml-4">
            <h3 className="text-lg leading-6 font-medium text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">{desc}</p>
        </div>
    </div>
);
