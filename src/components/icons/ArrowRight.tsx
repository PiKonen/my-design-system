import { IconBase, type IconProps } from './IconBase';

// Figma: ICONS › Arrow / Arrow-Right-L (node 132:25)
export function ArrowRight(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 7L21 12L16 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </IconBase>
  );
}
