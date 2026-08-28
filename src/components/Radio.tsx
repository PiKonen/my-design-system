import checkIcon from '../assets/check.svg';

interface RadioProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label?: string;
  error?: boolean;
  disabled?: boolean;
}

// Figma: Design system PI › Radiobutton (node 149:8)
// A 24px circle in a 28px slot, same geometry as Checkbox but fully rounded —
// and, as there, Figma now draws that slot as a Spacing/4XS (2px) inset rather
// than a bare 28px frame, and the circle-to-label gap is Spacing/XS (12px), up
// from 8px.
// Figma binds the circle to radius/lg (12px), which on a 24px box IS the circle.
// Here it stays rounded-full (radius/full, 40px): border-radius clamps to half
// the shorter side, so it renders the same 12px circle, and it keeps rendering
// a circle if the 24px size ever changes — rounded-lg would not.
// Focus is a 1px outline at 1px offset, landing on the design's 28px outer edge
// without shifting layout.
// Token mapping: color/ui/grey-100 -> grey-100, color/ui/grey-80 -> grey-80,
// color/border/dark -> border-dark, color/ui/error -> error,
// color/ui/error-dark -> error-dark, color/ui/default-bg -> surface.
// The selected glyph is a checkmark, not a dot — that is what the design uses,
// and it is the same asset the Checkbox renders.
const box = [
  'peer appearance-none size-[24px] shrink-0 rounded-full border',
  'cursor-pointer disabled:cursor-not-allowed',
  'focus-visible:outline-1 focus-visible:outline-offset-1',
].join(' ');

// Each branch sets exactly one bg-* so fills never compete on specificity.
// Unselected hover thickens the border to 2px (Figma "Hover").
function tone(selected: boolean, error: boolean, disabled: boolean) {
  if (disabled) {
    return selected ? 'border-border-dark bg-border-dark' : 'border-border-dark bg-surface';
  }
  if (error) {
    return [
      'border-error focus-visible:outline-error',
      selected ? 'bg-error hover:border-error-dark hover:bg-error-dark' : 'bg-white hover:border-2',
    ].join(' ');
  }
  return [
    'border-grey-100 focus-visible:outline-grey-100',
    selected
      ? 'bg-grey-100 hover:border-grey-80 hover:bg-grey-80'
      : 'bg-white hover:border-2 hover:border-grey-80',
  ].join(' ');
}

export function Radio({
  name,
  value,
  checked,
  onChange,
  label,
  error = false,
  disabled = false,
}: RadioProps) {
  return (
    <label
      className={`inline-flex items-center gap-xs font-body text-base ${
        disabled ? 'cursor-not-allowed text-body-disabled' : 'cursor-pointer text-body'
      }`}
    >
      <span className="relative inline-flex size-[28px] items-center justify-center">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          aria-invalid={error || undefined}
          onChange={() => onChange(value)}
          className={`${box} ${tone(checked, error, disabled)}`}
        />
        {checked && (
          <img
            src={checkIcon}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[10px] w-[14px] -translate-x-1/2 -translate-y-1/2"
          />
        )}
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
