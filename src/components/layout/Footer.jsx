const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    iconSrc: 'https://cdn.simpleicons.org/instagram/E4405F',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    iconSrc: 'https://cdn.simpleicons.org/facebook/1877F2',
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com',
    iconSrc: 'https://cdn.simpleicons.org/tiktok/FFFFFF',
  },
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
              {socialLinks.map(({ label, href, iconSrc }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-premium-dark transition hover:border-brand-amber/60 hover:bg-premium-black"
                >
                  <img
                    src={iconSrc}
                    alt=""
                    width={20}
                    height={20}
                    loading="lazy"
                    className="h-5 w-5 object-contain"
                  />
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
