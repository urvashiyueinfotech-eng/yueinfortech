import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

type CardProps = {
  title: string;
  slug: string;
  image: string;
  author?: string;
  date?: string;
  category?: string;
};

type BlogHighlightsProps = {
  posts?: CardProps[] | unknown;
};

export default function BlogHighlights({ posts }: BlogHighlightsProps) {
  const normalized = Array.isArray(posts)
    ? (posts as CardProps[]).filter((p) => p?.title && p?.image)
    : [];

  // Take up to 3 posts for the bento layout
  const displayPosts = normalized.slice(0, 3);

  // If no posts, don't render section
  if (displayPosts.length === 0) return null;

  const featuredPost = displayPosts[0];
  const sidePosts = displayPosts.slice(1, 3);

  return (
    <section className="bg-[#06080F] py-20 lg:py-28" id="blog">
      <div className="container max-w-7xl mx-auto px-[5%]">
        
        {/* We can remove or keep the top header. Keeping it to match the rest of the site's flow. */}
        <div className="mb-14 text-center max-w-2xl mx-auto animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
            <span className="text-[0.7rem] font-bold tracking-[0.12em] text-[#A8B4CC] uppercase">Latest Insights</span>
          </div>
          
          <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] font-[800] leading-[1.05] tracking-[-0.03em] text-[#F1F5FF] mb-5 font-['Syne',sans-serif]">
            SEO & Digital Marketing <span className="text-[#06B6D4]">Updates</span>
          </h2>
          
          <p className="text-[1.05rem] leading-[1.65] text-[#A8B4CC]">
            Written from real client work — not recycled summaries. Current as of 2026 algorithm updates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* LEFT: Featured Post */}
          {featuredPost && (
            <Link 
              href={featuredPost.slug} 
              className="group relative rounded-[24px] overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[600px] flex items-end p-8 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080F] via-[#06080F]/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative z-10 w-full max-w-lg transition-transform duration-300 group-hover:translate-y-[-8px]">
                <span className="inline-flex items-center px-3 py-1 bg-[#5865F2] text-white text-[0.7rem] font-bold rounded-full uppercase tracking-wider mb-4 shadow-[0_0_20px_rgba(88,101,242,0.4)]">
                  {featuredPost.category || "SEO & Analytics"}
                </span>
                <h3 className="font-['Syne',sans-serif] text-2xl md:text-3xl font-[800] text-white leading-tight">
                  {featuredPost.title}
                </h3>
              </div>
            </Link>
          )}

          {/* RIGHT: Stacked Posts */}
          {sidePosts.length > 0 && (
            <div className="flex flex-col gap-6">
              {sidePosts.map((post, index) => {
                const pillColors = ["bg-[#06B6D4]", "bg-[#8B5CF6]"];
                const glowColors = ["rgba(6,182,212,0.4)", "rgba(139,92,246,0.4)"];
                const pillColor = pillColors[index % pillColors.length];
                const glowColor = glowColors[index % glowColors.length];
                
                return (
                  <Link 
                    key={index} 
                    href={post.slug} 
                    className="group relative rounded-[24px] overflow-hidden aspect-[16/9] lg:aspect-auto lg:flex-1 lg:h-[288px] flex items-end p-6 lg:p-8 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.4)]"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06080F] via-[#06080F]/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    <div className="relative z-10 w-full max-w-md transition-transform duration-300 group-hover:translate-y-[-6px]">
                      <span 
                        className={`inline-flex items-center px-3 py-1 ${pillColor} text-white text-[0.7rem] font-bold rounded-full uppercase tracking-wider mb-3`}
                        style={{ boxShadow: `0 0 20px ${glowColor}` }}
                      >
                        {post.category || "Digital Strategy"}
                      </span>
                      <h3 className="font-['Syne',sans-serif] text-[1.2rem] md:text-xl font-[700] text-white leading-snug">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

        </div>

        <div className="mt-16 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 px-7 py-3 bg-transparent border border-white/20 hover:border-white/40 text-white font-bold rounded-full transition-all hover:bg-white/5 text-[0.9rem]">
            View All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}