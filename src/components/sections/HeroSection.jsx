export default function HeroSection() {
  return (
    <section id="top" className="-mx-4 mt-4 overflow-hidden border-y border-white/10">
      <div className="relative h-[38vh] min-h-[280px] sm:h-[46vh]">
        <div aria-hidden className="absolute inset-0">
          <img
            src="https://bianhapkhau.net/wp-content/uploads/2026/05/banner-duvel.jpg"
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-premium-black/65 via-premium-black/35 to-premium-black/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-premium-black/10 via-premium-black/25 to-premium-black/70" />
        </div>
      </div>
    </section>
  );
}

