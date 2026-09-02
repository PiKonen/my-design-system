interface FooterProps {
  copyright: string;
  tagline: string;
}

// Figma: Design system PI › Footer (node 396:30)
// Two slots — copyright and tagline — with no State axis: a footer neither
// responds to interaction nor carries an affordance, so there is nothing to
// hover, focus or press.
//
// DELIBERATE DEVIATION FROM FIGMA — read before "correcting" this to match.
// The Figma component has no variant axes at all (hasVariants: false), so it
// describes the desktop row only: one line, items-end, justify-between, at
// text/body/md. Implemented literally that way, the two strings are
// whitespace-nowrap in a single row and overflow a phone viewport.
// The live site had already solved this inline, so the mobile treatment below
// is lifted from my-website's LandingPage rather than invented here:
//   mobile   — stacked column, gap-2xs, text/body/s,  pt-l  pb-2xs
//   md and up— row, items-end, justify-between, body/md, pt-xl pb-m
// Figma is still the source of truth for everything else, and the gap should
// close from the design side: give 396:30 a Device variant the way Navigation
// (389:46) has one, then this comment goes away. Until then the code is
// deliberately ahead of the design, and the Code Connect snippet for this node
// will under-describe the mobile case.
//
// No inline padding on purpose. Figma's frame carries px-s (16px), but that
// 1344px frame is the page container, not the footer — and every real consumer
// puts this inside a container that already owns the inline gutter (the site's
// is px-l / md:px-xl). Adding px-s here would double-pad every one of them.
// Block padding is asymmetric by design: generous above, tight below.
//
// Colour is the disabled-text pairing, color/text/disabled #838383. That grey
// is the intended value here, not a disabled state leaking in — it is the
// quietest step that still clears 4.5:1 on white and on the #F5F5F5 surface.
export function Footer({ copyright, tagline }: FooterProps) {
  return (
    <footer className="flex w-full flex-col gap-2xs pt-l pb-2xs font-body text-body-s whitespace-nowrap text-body-disabled md:flex-row md:items-end md:justify-between md:pt-xl md:pb-m md:text-body-md">
      <p>{copyright}</p>
      <p>{tagline}</p>
    </footer>
  );
}
