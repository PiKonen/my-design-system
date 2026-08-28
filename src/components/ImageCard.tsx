interface ImageCardProps {
  src: string;
  alt: string;
  /** Caption heading. Omit — with `description` — for a bare image. */
  title?: string;
  /** Caption body. Omit — with `title` — for a bare image. */
  description?: string;
  href?: string;
}

export function ImageCard({ src, alt, title, description, href }: ImageCardProps) {
  const content = (
    <>
      <img src={src} alt={alt} className="size-full object-cover" />

      {/* Caption is anchored to the bottom-right corner and hidden until hover.
          group-focus-visible reveals it for keyboard users too, so the link
          variant is not hover-only. pointer-events-none keeps the panel from
          intercepting the hover it depends on.
          With neither title nor description there is no panel at all and the
          image stays bare in every state — the gallery case, and Figma's
          State=Default. Hence optional props rather than placeholder copy. */}
      {(title || description) && (
        <div className="pointer-events-none absolute right-s bottom-s flex max-w-[70%] flex-col gap-2xs rounded-md bg-black/60 p-s text-right opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          {/* Same pair as Card — text/display/xs over text/body/s — but reversed
              onto text-white, since it sits over an arbitrary photo rather than
              a white surface. */}
          {title && <h3 className="font-display text-display-xs text-white">{title}</h3>}
          {description && <p className="font-body text-body-s text-white">{description}</p>}
        </div>
      )}
    </>
  );

  // Figma: Design system PI › Image Card (node 328:22) — 540 × 418 at radius/md
  // (8px). The component lives in the design system file now, rather than being
  // read out of my-website node 17:20 as this comment used to say.
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
