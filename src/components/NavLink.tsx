interface NavLinkProps {
  label: string;
  href: string;
}

// Figma: Design system PI › Navi link (node 345:33) — `Property 1` (Default ·
// hover · focus) = 3 variants, plus a Label text property.
//
// Hover and focus are CSS pseudo-states here rather than props, the same call
// the Image Card's Code Connect template documents: a prop would let a caller
// render the hover appearance while no pointer is anywhere near the link, or
// paint a focus ring on something the keyboard has not reached.
//
// Focus is drawn as an outline rather than a border, which is what Figma's
// 2px color/primary/700 stroke at strokeAlign OUTSIDE actually describes. An
// outline is painted outside the box and excluded from layout, so the ring
// cannot reflow the menu the way a border appearing on focus would — the same
// reason Checkbox and Radio use outline for theirs. Button reaches for a border
// instead only because it already carries one in every state.
//
// Every value below is a token and the Figma node binds the same one:
//   text        text/button/s over color/ui/grey-80
//   hover fill  color/primary/100
//   focus ring  color/primary/700
//   radius      radius/md
// Padding is 8px in both, though only this side can say so in a token: the
// Figma file has a `radius` variable collection but no spacing one, so 8 is a
// raw number there and spacing/small here.
//
// The design originally drew 10px padding over unbound text at a 21px line
// height, none of which was on a scale. Figma was moved onto the tokens rather
// than this file off them, so there is no drift left to document.
//
// The radius applies in every state even though Figma draws it only on hover and
// focus: Default has no fill or stroke, so a corner radius on it is
// unobservable, and carrying it on the base means both the pill and the ring
// have something to round.
const base =
  'font-body text-button-s text-grey-80 ' +
  'inline-block p-small rounded-md ' +
  'transition-colors hover:bg-primary-100 ' +
  'focus-visible:outline-2 focus-visible:outline-primary-700';

export function NavLink({ label, href }: NavLinkProps) {
  return (
    <a href={href} className={base}>
      {label}
    </a>
  );
}
