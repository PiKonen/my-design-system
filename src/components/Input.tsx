interface InputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

// Figma: Design system PI › Input (node 18:5) — the frame is named Input, not
// TextArea as this comment previously claimed.
// Two values moved in Figma's rework: the inset dropped a step from Spacing/S
// (16px) to Spacing/XS (12px), and the corners from radius/md (8px) to
// radius/sm (4px) — the same radius the Checkbox box uses. Type is unchanged:
// text/body/md (Work Sans Regular 16 / 1.25).
const field = [
  'w-full p-xs rounded-sm border',
  'font-body text-body-md',
  'bg-white text-body placeholder:text-body',
  'focus:outline-none focus:border-2',
  'enabled:hover:text-body-disabled enabled:hover:placeholder:text-body-disabled',
  'disabled:bg-surface disabled:border-2 disabled:border-body disabled:text-body',
  'disabled:placeholder:text-body disabled:cursor-not-allowed',
].join(' ');

export function Input({ label, value, onChange, placeholder, error, disabled = false }: InputProps) {
  return (
    <div className="flex flex-col gap-2xs w-full">
      {label && (
        <label className="font-body text-sm font-medium text-body">
          {label}
        </label>
      )}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`${field} ${
          error ? 'border-error focus:border-error' : 'border-body focus:border-primary'
        }`}
      />
      {error && <span className="font-body text-xs text-error">{error}</span>}
    </div>
  );
}
