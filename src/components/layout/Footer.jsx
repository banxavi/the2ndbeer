import PrimaryCta from '../ui/PrimaryCta';

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'IG' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'FB' },
  { label: 'TikTok', href: 'https://tiktok.com', icon: 'TT' },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-premium-black">
      <div className="site-container py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="brand-logo-gradient text-xl font-bold">The 2nd Beer</div>
            <p className="mt-2 text-sm italic text-body-muted">One is never enough.</p>
            <p className="mt-1 text-sm text-body-subtle">Lon thứ hai mới là lon đáng nhớ.</p>
    
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Theo dõi chúng tôi</div>
            <div className="mt-4 flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-premium-dark text-xs font-bold text-brand-amber transition hover:border-brand-amber/60 hover:bg-premium-black"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Cảnh báo</div>
            <p className="mt-3 text-sm text-body-muted">
              Sản phẩm không dành cho người dưới 18 tuổi và phụ nữ mang thai.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-body-subtle">
          © {new Date().getFullYear()} The 2nd Beer. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
