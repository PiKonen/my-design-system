type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'large' | 'small';

interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick: () => void;
  disabled?: boolean;
}

// Figma: Design system PI › Button (node 1:231)
// Variant (Primary · Secondary) × State (Default · Hover · Focus · Disabled ·
// Pressed) × Size (Large · Small) = 20 variants.
// Everything size-independent lives here: radius/full (40px, clamps to a pill at
// both sizes) and the 2px border, which is always present so the Focus state
// cannot shift layout — Primary carries it transparent until focused.
// font-weight is not set here: it arrives with the text-button-* token below,
// the same way every other component in this library takes weight from its type
// step rather than restating it.
const base =
  'font-body whitespace-nowrap ' +
  'inline-flex items-center justify-center ' +
  'rounded-full border-2 border-solid ' +
  'transition-colors cursor-pointer ' +
  'focus-visible:outline-none disabled:cursor-not-allowed';

// Size carries padding and type only — the colour ramp below is shared, so the
// two sizes cannot drift apart. Every value here is a token:
//   Large: Spacing/S 16 inline, Spacing/XS 12 block, text/button/lg (16)
//   Small: Spacing/S 16 inline, Spacing/2XS 8 block, text/button/s  (14)
// Large was 24 inline / 16 block, and the 24 sat off the spacing scale
// entirely — the old scale ran 8/16/32/48 with nothing in between, so it had to
// borrow Tailwind's numeric px-6. Figma's reworked Spacing collection adds both
// a 12px step (xs) and a 24px one (m); large moved onto 16/12 and no longer
// needs the off-scale escape hatch. Small is unchanged in pixels.
// The type utilities are text-button-* rather than the raw text-base / text-sm
// this used to set: both steps now carry -0.02em tracking, and only the token
// brings it. Writing text-base here would silently drop it.
const sizes: Record<ButtonSize, string> = {
  large: 'px-s py-xs text-button-lg',
  small: 'px-s py-2xs text-button-s',
};

// Hover, Focus, Disabled and Pressed all exist in the Figma set and are matched
// here exactly. The ramp:
//   Primary:   500 #9285EA -> hover 600 #756AC2 -> pressed 800 #433B7D
//   Secondary: white -> hover 100 #F3F1FF -> pressed 200 #D5CFF9
// Primary deliberately skips 700 (#5D53A1): that is the focus border colour,
// and reusing it as the fill would hide the focus ring while pressed.
const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-500 border-transparent text-white ' +
    'enabled:hover:bg-primary-600 ' +
    'enabled:active:bg-primary-800 ' +
    'focus-visible:border-primary-700 ' +
    'disabled:bg-grey-100',
  secondary:
    'bg-white border-primary-500 text-black ' +
    'enabled:hover:bg-primary-100 ' +
    'enabled:active:bg-primary-200 ' +
    'focus-visible:bg-primary-200 focus-visible:border-primary-700 ' +
    'disabled:bg-grey-20 disabled:border-grey-40 disabled:text-grey-100',
};

export function Button({
  label,
  variant = 'primary',
  size = 'large',
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]}`}
    >
      {label}
    </button>
  );
}
