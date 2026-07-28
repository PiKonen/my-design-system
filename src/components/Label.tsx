interface LabelProps {
  label: string;
  disabled?: boolean;
}

export function Label({ label, disabled = false }: LabelProps) {
  return (
    <span className={`font-body text-body ${disabled ? 'opacity-50' : ''}`}>
      {label}
    </span>
  );
}
