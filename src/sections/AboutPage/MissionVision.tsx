export default function MissionVision() {
    return (
      <section className="py-20 bg-primary/5">
        <div className="mx-auto max-w-6xl px-6 grid gap-8 md:grid-cols-2">
          {[
            {
              title: "Our Mission",
              text: "To deliver modern, secure, and scalable digital solutions that drive real business impact. We focus on creating digital systems — not just campaigns."
            },
            {
              title: "Our Vision",
              text: "To be a trusted global partner for digital transformation and brand growth through innovation, performance, and transparency."
            }
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white p-10 shadow-sm ring-1 ring-black/5"
            >
              <h3 className="text-2xl font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-4 text-slate-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }