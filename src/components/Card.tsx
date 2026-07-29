interface CardProps {
  heading: string;
  body: string;
  image?: string;
  href?: string;
}

export function Card({ heading, body, image, href }: CardProps) {
  const content = (
    <>
      {image && <img src={image} alt={heading} className="w-full h-48 object-cover" />}
      <div className="p-6 flex flex-col gap-small">
        {/* Figma text/display/xs — Roboto Serif SemiBold 16 / AUTO leading / -2% */}
        <h3 className="font-display font-semibold text-base leading-[normal] tracking-[-0.32px] text-body">
          {heading}
        </h3>
        {/* Figma text/body/s — Work Sans Regular 14 / 125%. Body is full-strength
            text-body, not text-body-disabled: the design differentiates heading
            from body by size and weight, not by colour. */}
        <p className="font-body text-sm leading-[1.25] text-body">{body}</p>
      </div>
    </>
  );

  // Figma: Design system PI › Card (node 275:23) — radius/lg (12px).
  const base = 'flex flex-col bg-white rounded-lg border border-border overflow-hidden';

  if (href) {
    return (
      <a href={href} className={`${base} hover:shadow-raised transition-shadow`}>
        {content}
      </a>
    );
  }

  return <div className={base}>{content}</div>;
}
