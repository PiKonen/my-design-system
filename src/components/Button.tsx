type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  onClick: () => void;
  disabled?: boolean;
}

// Figma: Design system PI › Button (node 1:231)
// Shared box: Spacing/M (24px) inline, Spacing/S (16px) block, 40px radius,
// text/button/lg (Work Sans SemiBold 16 / -2% tracking).
// The 2px border is always present so the Focus state cannot shift layout —
// Primary carries it transparent until focused.
const base =
  'font-body font-semibold text-base tracking-[-0.32px] whitespace-nowrap ' +
  'inline-flex items-center justify-center ' +
  'px-6 py-4 rounded-[40px] border-2 border-solid ' +
  'transition-colors cursor-pointer ' +
  'focus-visible:outline-none disabled:cursor-not-allowed';

// The pressed (:active) state is NOT in the Figma set — it has only Default,
// Hover, Focus and Disabled. Both fills below are derived by continuing the
// primary ramp one step past Hover, using tokens already in index.css:
//   Primary:   500 #9285EA -> hover 600 #756AC2 -> active 800 #433B7D
//   Secondary: white -> hover 100 #F3F1FF -> active 200 #D5CFF9
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

export function Button({ label, variant = 'primary', onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]}`}>
      {label}
    </button>
  );
}
