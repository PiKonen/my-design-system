import { IconBase, type IconProps } from './IconBase';

// Figma: ICONS › Arrow / Arrow-Left-L (node 132:28)
export function ArrowLeft(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M21 12L3 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 17L3 12L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </IconBase>
  );
}
