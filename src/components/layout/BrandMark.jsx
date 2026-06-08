import logoImg from '../../assets/L&Co.png';

export default function BrandMark({ compact = false }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
      <img
        src={logoImg}
        alt=""
        className={[
          'shrink-0 rounded-full object-cover ring-1 ring-brand-amber/25',
          compact ? 'h-9 w-9' : 'h-10 w-10 sm:h-12 sm:w-12',
        ].join(' ')}
        width={48}
        height={48}
        loading="eager"
      />
      <div className="min-w-0">
        <div
          className={[
            'brand-wordmark brand-logo-gradient font-semibold leading-none tracking-[0.06em]',
            compact ? 'text-base' : 'text-[1.05rem] sm:text-xl',
          ].join(' ')}
        >
          LUVINI &amp; CO.
        </div>
        <p
          className={[
            'mt-1 truncate font-sans leading-snug text-white/90',
            compact ? 'text-[9px]' : 'text-[10px] sm:text-[11px]',
          ].join(' ')}
        >
          Curated Fine Wine &amp; Imported Beer
        </p>
        <p
          className={[
            'truncate font-sans leading-snug text-white/78',
            compact ? 'text-[9px]' : 'text-[10px] sm:text-[11px]',
          ].join(' ')}
        >
          The Art of Fine Taste
        </p>
      </div>
    </div>
  );
}
