import FadeInSection from '../ui/FadeInSection';

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
    desc: 'Giao diện tối ưu mobile, dễ xem và dễ chọn — cho khoảnh khắc thưởng thức trọn vẹn.',
  },
];

export default function UspSection() {
  return (
    <FadeInSection className="pt-14">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-premium-dark p-5">
          <div className="text-xs font-semibold text-brand-amber">CHÍNH HÃNG</div>
          <div className="mt-2 text-sm text-body-muted">Nguồn gốc rõ ràng</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-premium-dark p-5">
          <div className="text-xs font-semibold text-brand-amber">TƯ VẤN</div>
          <div className="mt-2 text-sm text-body-muted">Chọn theo khẩu vị</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-premium-dark p-5">
          <div className="text-xs font-semibold text-brand-amber">NHANH</div>
          <div className="mt-2 text-sm text-body-muted">Phản hồi trong ngày</div>
        </div>
      </div>

      <div className="mt-10">
        <div className="text-xs font-semibold tracking-normal text-brand-amber">GIÁ TRỊ</div>
        <h2 className="mt-2 text-2xl font-semibold text-white">Vì sao chọn The 2nd Beer</h2>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {uspItems.map((item) => (
          <div key={item.title} className="rounded-2xl border border-white/10 bg-premium-dark p-5">
            <div className="text-sm font-semibold text-brand-amber">{item.title}</div>
            <p className="mt-2 text-sm leading-relaxed text-body-muted">{item.desc}</p>
          </div>
        ))}
      </div>
    </FadeInSection>
  );
}
