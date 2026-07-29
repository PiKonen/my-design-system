import { useEffect, useRef } from 'react';
import checkIcon from '../assets/check.svg';
import dashIcon from '../assets/checkbox-indeterminate.svg';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  indeterminate?: boolean;
  error?: boolean;
  disabled?: boolean;
}

// Figma: Design system PI › Checkbox (node 30:23)
// A 24px box at radius/sm (4px), sitting in a 28px slot. Focus is a 1px outline
// at 1px offset, which lands exactly on the design's 28px outer edge and — being
// an outline — cannot shift layout.
// Token mapping: color/text/default -> body, Color/Grey/80 -> grey-80,
// color/border/dark -> border-dark, color/ui/error -> error,
// Color/Red/140 -> error-dark. Checkmark and dash are Figma SVG exports.
const box = [
  'peer appearance-none size-[24px] shrink-0 rounded-sm border',
  'cursor-pointer disabled:cursor-not-allowed',
  'focus-visible:outline-1 focus-visible:outline-offset-1',
].join(' ');

// `filled` covers both Selected and Indeterminate — the design gives them the
// same fill, differing only in which glyph sits on top. Unfilled boxes are
// white; each branch sets exactly one bg-* so the two never compete.
function tone(filled: boolean, error: boolean, disabled: boolean) {
  if (disabled) {
    return filled ? 'border-border-dark bg-border-dark' : 'border-border-dark bg-white';
  }
  if (error) {
    return [
      'border-error focus-visible:outline-error',
      filled ? 'bg-error hover:border-error-dark hover:bg-error-dark' : 'bg-white hover:border-2',
    ].join(' ');
  }
  return [
    'border-body focus-visible:outline-body',
    filled
      ? 'bg-body hover:border-grey-80 hover:bg-grey-80'
      : 'bg-white hover:border-2 hover:border-grey-80',
  ].join(' ');
}

export function Checkbox({
  checked,
  onChange,
  label,
  indeterminate = false,
  error = false,
  disabled = false,
}: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);

  // Indeterminate is a DOM property, not an attribute — without this the state
  // is invisible to assistive tech.
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const filled = checked || indeterminate;

  return (
    <label
      className={`inline-flex items-center gap-small font-body text-base ${
        disabled ? 'cursor-not-allowed text-body-disabled' : 'cursor-pointer text-body'
      }`}
    >
      <span className="relative inline-flex size-[28px] items-center justify-center">
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          aria-invalid={error || undefined}
          onChange={(e) => onChange(e.target.checked)}
          className={`${box} ${tone(filled, error, disabled)}`}
        />
        {filled && (
          <img
            src={indeterminate ? dashIcon : checkIcon}
            alt=""
            aria-hidden="true"
            className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
              indeterminate ? 'h-[2px] w-[14px]' : 'h-[10px] w-[14px]'
            }`}
          />
        )}
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
