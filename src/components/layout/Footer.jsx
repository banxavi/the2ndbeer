import { formatPhoneDisplay } from '../../lib/formatters';
import { buildTelHref, buildZaloHref } from '../../lib/links';

const HOTLINE = '0931833666';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-premium-black">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-lg font-semibold tracking-[0.22em] text-premium-gold">BEER PREMIUM</div>
            <p className="mt-2 text-sm text-white/70">
              Landing page cá nhân (phi thương mại) cho sản phẩm bia nhập khẩu cao cấp.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold text-white/80">Liên hệ</div>
            <div className="mt-3 space-y-2 text-sm">
              <a className="block text-white/80 hover:text-white" href={buildTelHref(HOTLINE)}>
                Hotline: {formatPhoneDisplay(HOTLINE)}
              </a>
              <a
                className="block text-white/80 hover:text-white"
                href={buildZaloHref(HOTLINE)}
                target="_blank"
                rel="noreferrer"
              >
                Zalo: {formatPhoneDisplay(HOTLINE)}
              </a>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-white/80">Cảnh báo</div>
            <p className="mt-3 text-sm text-white/70">
              Sản phẩm không dành cho người dưới 18 tuổi và phụ nữ mang thai
            </p>
          </div>
        </div>

        <div className="mt-10 text-xs text-white/50">© {new Date().getFullYear()} Beer Premium</div>
      </div>
    </footer>
  );
}
