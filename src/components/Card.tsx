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
      <div className="p-m flex flex-col gap-2xs">
        <h3 className="font-display text-display-xs text-body">{heading}</h3>
        {/* Body is full-strength text-body, not text-body-disabled: the design
            differentiates heading from body by size and weight, not by colour. */}
        <p className="font-body text-body-s text-body">{body}</p>
      </div>
    </>
  );

  // Figma: Design system PI › Card (node 275:23) — radius/lg (12px), inset
  // Spacing/M (24px), heading-to-body gap Spacing/2XS (8px). The inset is
  // unchanged at 24px but is a token now; it needed Tailwind's numeric p-6
  // before, because the old spacing scale jumped straight from 16 to 32.
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
