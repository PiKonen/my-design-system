type TagVariant = 'neutral' | 'primary' | 'secondary';

interface TagProps {
  label: string;
  variant?: TagVariant;
}

// Figma: Design system PI › Tag (node 341:24)
// Variant (Neutral · Secondary · Primary) = 3 variants, and no State axis: a tag
// labels content rather than responding to it, so there is nothing to hover,
// focus or press. That is also why it renders as a <span> and not a <button> —
// the element carries no interaction affordance it cannot honour.
// Shape and type are variant-independent: radius/full (40px, which clamps to a
// pill at this height) and text/body/s (Work Sans Regular 14 / 1.25).
// Padding is 4px block / 12px inline in Figma. Neither sits on the spacing scale
// (8/16/32/48), so both stay on Tailwind's numeric steps — the same exception
// Button already makes for its 24px inline padding.
const base =
  'font-body text-body-s whitespace-nowrap ' +
  'inline-flex items-center ' +
  'px-3 py-1 rounded-full';

// Each variant is a tonal pair drawn from one ramp: the 100 step as the fill,
// the 800 step as the label. Neutral has no brand ramp to sit on, so it borrows
// the UI grey ramp and the default body colour.
//   Neutral:   grey-20       #EEEEEE / body          #383636
//   Primary:   primary-100   #F3F1FF / primary-800   #433B7D
//   Secondary: secondary-100 #CEFFFA / secondary-800 #1F5952
// The 800 step is the darkest on each ramp, so all three pairs clear 4.5:1 at
// 14px. Secondary in particular has to reach that far down — its 600 step is the
// documented dead zone that fails against both white and black.
const variants: Record<TagVariant, string> = {
  neutral: 'bg-grey-20 text-body',
  primary: 'bg-primary-100 text-primary-800',
  secondary: 'bg-secondary-100 text-secondary-800',
};

export function Tag({ label, variant = 'neutral' }: TagProps) {
  return <span className={`${base} ${variants[variant]}`}>{label}</span>;
}
