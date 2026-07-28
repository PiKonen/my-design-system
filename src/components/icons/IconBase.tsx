import type { ReactNode, SVGProps } from 'react';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  /** Square size in px. Defaults to 24, the Figma artboard size. */
  size?: number;
}

interface IconBaseProps extends IconProps {
  children: ReactNode;
}

// Shared wrapper for the icon set exported from Figma (ICONS, node 185:17).
// All geometry is a verbatim Figma export on a 24x24 artboard at 1.5 stroke;
// stroke/fill are currentColor so colour comes from a text-* utility.
export function IconBase({
  size = 24,
  className = '',
  children,
  'aria-label': ariaLabel,
  ...rest
}: IconBaseProps) {
  // Apply the grey-100 default only when the caller hasn't passed a text-*
  // class. Both would have equal specificity, so otherwise the winner would
  // depend on Tailwind's output order rather than the caller's intent.
  const hasColor = /(?:^|\s)text-/.test(className);
  const labelled = Boolean(ariaLabel);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${hasColor ? '' : 'text-grey-100'} ${className}`.trim()}
      aria-label={ariaLabel}
      role={labelled ? 'img' : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}
