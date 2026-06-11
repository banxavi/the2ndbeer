import { useEffect } from 'react';
import { FOOTER } from '../data/footer';
import CatalogPageHeader from '../components/layout/CatalogPageHeader';

export default function PolicyPage({ policySlug }) {
  const policy = FOOTER.policies.find((p) => p.href === `/chinh-sach/${policySlug}`);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [policySlug]);

  if (!policy) {
    return (
      <div className="site-container py-16 text-center">
        <h1 className="text-2xl font-semibold text-white">Không tìm thấy trang</h1>
      </div>
    );
  }

  return (
    <div className="site-container pt-10 pb-16">
      <CatalogPageHeader eyebrow="CHÍNH SÁCH" title={policy.label} />
      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-body-muted sm:text-base">
        Nội dung chính sách đang được chuẩn bị. Vui lòng liên hệ hotline để được hỗ trợ trực tiếp.
      </p>
    </div>
  );
}
