interface FooterProps {
  copyright: string;
  tagline: string;
}

// Figma: Design system PI › Footer (node 396:30)
// A single component with no variant axes — no Device split and no State axis:
// the footer neither responds to interaction nor changes shape between
// breakpoints, so there is nothing to hover, focus or press, and no Mobile
// counterpart to branch on. That is also why it takes no `device` prop the way
// Nav does.
// Layout is one row, justify-between, aligned on the text baselines' bottom
// edge (items-end) — both slots are single-line, so this reads the same as
// items-center today, but it is what Figma binds and it keeps the two ends
// aligned if one side ever wraps to two lines.
// Padding is deliberately asymmetric on the block axis: xl (48px) above,
// m (24px) below, s (16px) inline. The frame is 1344px wide in Figma — that is
// the page container, not the footer, so it renders w-full and inherits its
// width from whatever wraps it.
// Type and colour are the disabled-text pairing: text/body/md (Work Sans
// Regular 16 / 1.25) at color/text/disabled #838383. That grey is the intended
// value here, not a disabled state leaking in — it is the quietest step that
// still clears 4.5:1 on the #F5F5F5 surface.
export function Footer({ copyright, tagline }: FooterProps) {
  return (
    <footer className="flex w-full items-end justify-between px-s pb-m pt-xl font-body text-body-md whitespace-nowrap text-body-disabled">
      <p>{copyright}</p>
      <p>{tagline}</p>
    </footer>
  );
}
