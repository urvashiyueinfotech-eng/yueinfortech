 "use client";

import { useState } from "react";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !phone || !email || !subject || !message) {
      setStatus("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      setStatus(null);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, subject, message }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to submit");
      }
      setStatus("Thank you! We received your message and will respond soon.");
      form.reset();
    } catch (error: any) {
      setStatus(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/* HERO */}
      <PageHero
        title="Contact Us"
        backgroundImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1920"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      {/* CONTACT SECTION */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="Get In Touch"
            title="Free Consultation"
            subtitle="Tell us about your goals and challenges. Our experts will get back to you within 24 hours."
            align="center"
            className="mx-auto max-w-3xl"
          />

          <div className="mt-14 grid overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-100 lg:grid-cols-2">
            
            {/* FORM */}
            <div className="p-8 sm:p-12">
              <form className="grid gap-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name *"
                    required
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    required
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    required
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject *"
                    required
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>

                <textarea
                  rows={5}
                  name="message"
                  placeholder="Message"
                  required
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-fit rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-700 disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                {status && (
                  <p className="text-sm text-slate-700">{status}</p>
                )}
              </form>
            </div>

            {/* IMAGE */}
            <div className="relative hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1600"
                alt="Contact Yue Infotech"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
