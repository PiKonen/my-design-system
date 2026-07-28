import { IconBase, type IconProps } from './IconBase';

// Figma: ICONS › Basic / Close-L (node 62:8)
export function Close(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M21 21L3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21.0001 3L3 21.0001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </IconBase>
  );
}
