import FadeInSection from '../ui/FadeInSection';

export default function BrandStorySection() {
  return (
    <FadeInSection id="story" className="pt-14">
      <div className="rounded-2xl border border-white/10 bg-premium-dark p-6 sm:p-10">
        <div className="text-xs font-semibold tracking-normal text-brand-amber">CÂU CHUYỆN THƯƠNG HIỆU</div>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Vì sao là “lon thứ hai”?</h2>
        <div className="mt-5 space-y-4 text-base leading-relaxed text-body-muted text-measure">
          <p>
            Lon đầu tiên thường là sự khởi đầu — hơi vội, hơi ồn, đôi khi còn đang “làm quen” với không khí.
            Nhưng đến <strong className="font-semibold text-white">lon thứ hai</strong>, mọi thứ bỗng chậm lại:
            bạn thả lỏng, trò chuyện thật hơn, và cảm nhận hương vị trọn vẹn hơn.
          </p>
          <p>
            <strong className="font-semibold text-white">The 2nd Beer</strong> ra đời từ chính khoảnh khắc đó — khi
            bia không còn chỉ là đồ uống, mà là phần ký ức của buổi tối: chân thành, ấm áp, và đáng nhớ.
          </p>
          <p>
            Chúng tôi chọn lọc những chai bia nhập khẩu có chiều sâu hương vị, để mỗi lon thứ hai của bạn đều xứng
            đáng được gọi là “lon đáng nhớ”.
          </p>
        </div>
      </div>
    </FadeInSection>
  );
}
