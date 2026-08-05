interface ImageCardProps {
  src: string;
  alt: string;
  title: string;
  description: string;
  href?: string;
}

export function ImageCard({ src, alt, title, description, href }: ImageCardProps) {
  const content = (
    <>
      <img src={src} alt={alt} className="size-full object-cover" />

      {/* Caption is anchored to the bottom-right corner and hidden until hover.
          group-focus-visible reveals it for keyboard users too, so the link
          variant is not hover-only. pointer-events-none keeps the panel from
          intercepting the hover it depends on. */}
      <div
        className="pointer-events-none absolute right-medium bottom-medium flex max-w-[70%] flex-col gap-small rounded-md bg-black/60 p-medium text-right opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {/* Same pair as Card — text/display/xs over text/body/s — but reversed
            onto text-white, since it sits over an arbitrary photo rather than
            a white surface. */}
        <h3 className="font-display font-semibold text-base leading-[normal] text-white">
          {title}
        </h3>
        <p className="font-body text-sm leading-[1.25] text-white">{description}</p>
      </div>
    </>
  );

  // Figma: my-website › Image (node 17:20) — 540 × 417.851 at radius/md (8px).
  // Note this is radius-md, not the Card's radius-lg: the design draws the bare
  // image at 8px. The frame's proportion is kept as an aspect ratio so the
  // component stays width-fluid instead of pinned to 540px.
  const base = 'group relative block overflow-hidden rounded-md aspect-[540/418]';

  if (href) {
    return (
      <a href={href} className={`${base} hover:shadow-raised transition-shadow`}>
        {content}
      </a>
    );
  }

  return <div className={base}>{content}</div>;
}
