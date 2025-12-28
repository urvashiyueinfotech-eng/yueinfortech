import React from 'react';
import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';

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
        title="Contact Us"
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
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                About Yue Infotech<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  Your Digital Growth Partner
                </span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Yue Infotech is a full-service digital agency specializing in web development, SEO, digital marketing, content strategy, branding, and IT infrastructure services. Since 2018, we’ve helped businesses build powerful online experiences that attract, convert, and scale.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#services" className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30">
                  Explore Services
                </Link>
                <Link href="#story" className="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-lg font-semibold hover:bg-slate-50 transition">
                  Our Story
                </Link>
              </div>
            </div>
            
            {/* Abstract Visual */}
            <div className="relative lg:block">
              {/* Blobs using standard Tailwind colors */}
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
              
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Team working at Yue Infotech" 
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
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To deliver modern, secure, and scalable digital solutions that drive real business impact. We focus on creating digital systems — not just campaigns — that help businesses grow sustainably.
              </p>
            </div>
            
            {/* Vision */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:-translate-y-1 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To be a trusted global partner for digital transformation and brand growth. Innovation, performance, transparency, and customer-first thinking guide everything we do.
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
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Office culture" 
                  className="rounded-2xl shadow-xl grayscale hover:grayscale-0 transition duration-500 w-full" 
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-600 hidden sm:block">
                  <p className="text-4xl font-bold text-slate-900">7+</p>
                  <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider">Years of Experience</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story (Founded in 2018)</h2>
              <p className="text-slate-600 mb-4">
                Yue Infotech began in 2018 with a simple belief: <strong className="text-indigo-600">Digital transformation should be easier, faster, and more effective for every business.</strong>
              </p>
              <p className="text-slate-600 mb-6">
                From building websites for local businesses to delivering full-suite solutions for global brands, our journey has been driven by one goal — help businesses grow with technology and strategy.
              </p>
              
              <div className="mt-8">
                <h4 className="font-bold text-slate-900 mb-4">Who We Are Today</h4>
                <p className="text-slate-600">
                  Yue Infotech is a team of strategists, designers, developers, marketers, and IT specialists working together to deliver high-performing digital solutions. We bring clarity, creativity, and technical expertise to brands that want long-term, measurable growth.
                </p>
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
            {/* Service 1 */}
            <ServiceCard 
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>}
              title="Web Design & Dev"
              colorClass="blue"
              items={["Custom Websites & WordPress", "Ecommerce & B2B Design", "UI/UX & Landing Pages", "Performance Optimization"]}
            />

            {/* Service 2 */}
            <ServiceCard 
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>}
              title="SEO & Optimization"
              colorClass="green"
              items={["SEO (AEO) & Technical SEO", "Local & E-Commerce SEO", "GEO • SXO • HEO", "Comprehensive Audits"]}
            />

            {/* Service 3 */}
            <ServiceCard 
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6 3 3 0 000 6v6a1 1 0 001 1h1v4h-3a2 2 0 00-2-2v-3.28"></path>}
              title="Digital Marketing"
              colorClass="purple"
              items={["Google, Meta & LinkedIn Ads", "Social Media Marketing", "PPC Funnels & Retargeting", "ORM & Brand Strategy"]}
            />

            {/* Service 4 */}
            <ServiceCard 
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>}
              title="Content & Copy"
              colorClass="pink"
              items={["Website & Ad Copy", "Blog Articles & Technical Writing", "Thought Leadership", "Knowledge Base Creation"]}
            />

            {/* Service 5 */}
            <ServiceCard 
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>}
              title="IT & Infrastructure"
              colorClass="cyan"
              items={["Cloud Hosting & Server Mgmt", "Cybersecurity", "VOIP & Communication Tools"]}
            />
            
            {/* CTA Card */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-6 rounded-xl flex flex-col justify-center items-center text-center text-white">
              <h3 className="text-xl font-bold mb-2">Need a custom solution?</h3>
              <p className="text-sm text-indigo-200 mb-4">Let's discuss your project.</p>
              <Link href="#contact" className="inline-block px-6 py-2 bg-white text-indigo-900 rounded-full font-bold text-sm hover:bg-indigo-50 transition">
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
             <Step number="1" title="Analyze" desc="Research goals, audience, and competitors." color="bg-indigo-600" />
             <Step number="2" title="Strategize" desc="Map SEO, content, UX & technical plans." color="bg-purple-600" />
             <Step number="3" title="Execute" desc="Crafting websites & marketing with precision." color="bg-blue-600" />
             <Step number="4" title="Scale" desc="Improve performance, rankings & conversions." color="bg-pink-600" />
             <Step number="5" title="Support" desc="Updates, security & long-term growth." color="bg-cyan-600" />
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
                {[
                  "Experienced since 2018",
                  "Full-stack digital & IT expertise",
                  "E-E-A-T & data-backed strategies",
                  "AI-enhanced optimization (AEO • GEO • SXO)",
                  "Custom-built solutions, never generic",
                  "Transparent processes & real reporting",
                  "Measurable growth, not vanity metrics"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
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
                <ValueItem 
                  title="Integrity & Transparency" 
                  desc="We believe in honest communication and ethical execution."
                  icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />}
                />
                <ValueItem 
                  title="Innovation & Improvement" 
                  desc="We continuously improve using new tools, frameworks, and AI systems."
                  icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />}
                />
                 <ValueItem 
                  title="Client-Centered Approach" 
                  desc="Your goals shape our strategy. Your success drives our success."
                  icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                />
              </div>
            </div>
          </div>
          
          {/* Industries Badge Cloud */}
          <div className="mt-16 pt-10 border-t border-slate-200 text-center">
            <p className="text-slate-500 mb-6 font-medium">Industries We Serve</p>
            <div className="flex flex-wrap justify-center gap-4">
              {["SaaS", "E-commerce", "Healthcare", "Real Estate", "Education", "Local Business", "B2B Enterprises"].map((ind, i) => (
                <span key={i} className="px-4 py-2 bg-white rounded-full border border-slate-200 text-sm font-medium text-slate-600 hover:border-indigo-300 transition cursor-default">
                  {ind}
                </span>
              ))}
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

const ServiceCard = ({ icon, title, items, colorClass }: { icon: any, title: string, items: string[], colorClass: string }) => {
    // Mapping colors to Tailwind classes dynamically can be tricky with JIT, 
    // so we handle specific cases or use safe-listing. 
    // For this mockup, I'll stick to a simple mapping or just pass style props.
    // To keep it simple for copy-paste, I'll default to Indigo/Blue mix if dynamic fails, 
    // but here I use standard group-hover logic.
    
    const colorMap: {[key: string]: string} = {
        blue: "text-blue-600 bg-blue-50 group-hover:bg-blue-600",
        green: "text-green-600 bg-green-50 group-hover:bg-green-600",
        purple: "text-purple-600 bg-purple-50 group-hover:bg-purple-600",
        pink: "text-pink-600 bg-pink-50 group-hover:bg-pink-600",
        cyan: "text-cyan-600 bg-cyan-50 group-hover:bg-cyan-600",
    };

    const activeColor = colorMap[colorClass] || colorMap.blue;

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-xl transition duration-300 group">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition group-hover:text-white ${activeColor}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {icon}
                </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
            <ul className="space-y-2 text-sm text-slate-600">
                {items.map((item, i) => <li key={i}>• {item}</li>)}
            </ul>
        </div>
    );
};

const Step = ({ number, title, desc, color }: { number: string, title: string, desc: string, color: string }) => (
    <div className="relative p-4">
        <div className={`w-16 h-16 ${color} rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 border-4 border-slate-800`}>
            {number}
        </div>
        <h4 className="font-bold text-lg mb-2">{title}</h4>
        <p className="text-sm text-slate-400">{desc}</p>
    </div>
);

const ValueItem = ({ title, desc, icon }: { title: string, desc: string, icon: any }) => (
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