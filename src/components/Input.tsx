interface InputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

// Figma: Design system PI › TextArea (node 18:5)
// Figma Spacing/S (16px) -> spacing-medium inset; radius/md (8px) -> radius-md;
// text/body/md (Work Sans Regular 16 / 1.25).
const field = [
  'w-full p-medium rounded-md border',
  'font-body text-body-md',
  'bg-white text-body placeholder:text-body',
  'focus:outline-none focus:border-2',
  'enabled:hover:text-body-disabled enabled:hover:placeholder:text-body-disabled',
  'disabled:bg-surface disabled:border-2 disabled:border-body disabled:text-body',
  'disabled:placeholder:text-body disabled:cursor-not-allowed',
].join(' ');

export function Input({ label, value, onChange, placeholder, error, disabled = false }: InputProps) {
  return (
    <div className="flex flex-col gap-small w-full">
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
