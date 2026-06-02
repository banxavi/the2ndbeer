const uspItems = [
  {
    title: 'Chọn lọc kỹ',
    desc: 'Danh sách sản phẩm được chọn theo tiêu chí hương vị, độ cồn và độ cân bằng.',
  },
  {
    title: 'Tư vấn dễ hiểu',
    desc: 'Gợi ý theo khẩu vị: đắng nhẹ, hậu ngọt, malt đậm… phù hợp bữa ăn & dịp tặng.',
  },
  {
    title: 'Trải nghiệm premium',
    desc: 'Giao diện dark mode sang trọng, CTA rõ ràng, tối ưu mobile để xem nhanh.',
  },
];

export default function UspSection() {
  return (
    <section className="pt-12">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-premium-dark p-5">
          <div className="text-xs font-semibold tracking-normal text-premium-gold">CHÍNH HÃNG</div>
          <div className="mt-2 text-sm text-white/80">Nguồn gốc rõ ràng</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-premium-dark p-5">
          <div className="text-xs font-semibold tracking-normal text-premium-gold">TƯ VẤN</div>
          <div className="mt-2 text-sm text-white/80">Chọn theo khẩu vị</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-premium-dark p-5">
          <div className="text-xs font-semibold tracking-normal text-premium-gold">NHANH</div>
          <div className="mt-2 text-sm text-white/80">Phản hồi trong ngày</div>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold tracking-normal text-premium-gold">GIÁ TRỊ</div>
          <h2 className="mt-2 text-2xl font-semibold">Vì sao chọn Beer Premium</h2>
        </div>
        <a
          href="#products"
          className="hidden rounded-md border border-premium-gold/60 bg-premium-black/45 px-4 py-2 text-sm font-semibold text-premium-gold shadow-lg shadow-black/20 ring-1 ring-premium-gold/15 transition hover:-translate-y-0.5 hover:border-premium-gold/80 hover:bg-premium-black/55 hover:shadow-black/30 active:translate-y-0 sm:inline-flex"
        >
          Xem sản phẩm
        </a>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {uspItems.map((item) => (
          <div key={item.title} className="rounded-2xl border border-white/10 bg-premium-dark p-5">
            <div className="text-sm font-semibold text-premium-gold">{item.title}</div>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

