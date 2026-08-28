interface NavLinkProps {
  label: string;
  href: string;
  active?: boolean;
}

// Figma: Design system PI › Navi link (node 345:33) — `Property 1` (Default ·
// hover · focus · Active) = 4 variants, plus a Label text property.
//
// Hover and focus are CSS pseudo-states here rather than props, the same call
// the Image Card's Code Connect template documents: a prop would let a caller
// render the hover appearance while no pointer is anywhere near the link, or
// paint a focus ring on something the keyboard has not reached.
//
// Active is the one variant that has to be a prop. It says which page the
// visitor is currently on, and no pseudo-class knows that — note it is NOT the
// CSS `:active`, which means "being pressed right now" and lasts for one
// mousedown. The prop keeps Figma's name for the state rather than CSS's, since
// the design set is what callers read first.
//
// Because it is a real prop it also gets `aria-current="page"`. Figma can only
// draw the dark pill, but a current-page marker that exists only as a fill is
// invisible to a screen reader, and this is the attribute that carries the same
// meaning in the accessibility tree.
//
// Focus is drawn as an outline rather than a border, which is what Figma's
// 2px color/primary/700 stroke at strokeAlign OUTSIDE actually describes. An
// outline is painted outside the box and excluded from layout, so the ring
// cannot reflow the menu the way a border appearing on focus would — the same
// reason Checkbox and Radio use outline for theirs. Button reaches for a border
// instead only because it already carries one in every state.
//
// Every value below is a token and the Figma node binds the same one:
//   text         text/button/s over color/ui/grey-80
//   hover fill   color/primary/100
//   focus ring   color/primary/700
//   active fill  color/primary/800 with color/ui/white text
//   radius       radius/md
// Padding is 8px in every state, and both sides can say so in a token now: the
// Figma file has gained a `Spacing` collection alongside `radius`, and the node
// binds Spacing/2XS where this used to be a raw number there against spacing/2xs
// here.
//
// The design originally drew 10px padding over unbound text at a 21px line
// height, none of which was on a scale. Figma was moved onto the tokens rather
// than this file off them, so there is no drift left to document.
//
// The radius applies in every state even though Figma draws it only on hover,
// focus and Active: Default has no fill or stroke, so a corner radius on it is
// unobservable, and carrying it on the base means the pill and the ring both
// have something to round.
const base =
  'font-body text-button-s ' +
  'inline-block p-2xs rounded-md ' +
  'transition-colors ' +
  'focus-visible:outline-2 focus-visible:outline-primary-700';

// Colour is the only axis Active moves — and it takes the hover rule with it.
// The Figma set has no hover-while-active variant, so this is a judgment call:
// letting primary-100 win over primary-800 would make pointing at the current
// page look like pointing at any other, so the active fill simply stays put.
// primary-800 is also Button's pressed fill; the label flips to color/ui/white
// over it because that is what the ramp is documented for — theme.css puts white
// text on primary from 600 down, and 800 carries it at 9.7:1.
const states = {
  default: 'text-grey-80 hover:bg-primary-100',
  active: 'bg-primary-800 text-white',
};

export function NavLink({ label, href, active = false }: NavLinkProps) {
  return (
    <a
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`${base} ${states[active ? 'active' : 'default']}`}
    >
      {label}
    </a>
  );
}
