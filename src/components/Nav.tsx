import { NavLink } from './NavLink';

interface NavItem {
  label: string;
  href: string;
}

interface NavProps {
  siteName: string;
  links: NavItem[];
}

// Figma: Design system PI › Navigation (node 345:18)
//
// The links are NavLink instances in the design, so they are NavLink here too
// rather than anchors styled a second way. That is the whole point of this
// rebuild: Nav previously styled its own links with a colour shift while the
// NavLink component drew a tinted pill, and the two disagreed about what a
// navigation link looks like.
//
// Values snapped onto the scales, with Figma moved to match rather than the
// reverse (the node now binds all four):
//   padding    24px -> Spacing/L (32px), the nearest step with the tie rounding
//              up, which is the convention the landing page documents. Figma
//              binds Spacing/L directly now, so nothing is being snapped here
//              any more — and note 24px has its own step (Spacing/M) these
//              days, so the original value would no longer need rounding
//   link gap   23px -> Spacing/S (16px). The design expressed this as a fixed
//              169px row set to SPACE_BETWEEN; it is a real gap now
//   site name  Work Sans Bold 16 / 24 / -0.16 -> text/body/md-em, same family
//              and size
//   site name  raw #211E1E -> color/ui/black, the nearest token to it
//   surfaces   raw #FFFFFF and #EEEEEE -> color/ui/white and color/ui/grey-20
//
// Two things here are not in the Figma node, both deliberate. `sticky top-0`
// survives from the previous Nav: a static frame cannot express scroll
// behaviour, so the design's silence is not an instruction to drop it. The
// `max-w-5xl` inner container likewise — Figma only draws the 390px mobile
// width, and without a container the bar would run edge to edge on a desktop
// viewport while the page below it stays in a 1024px column.
export function Nav({ siteName, links }: NavProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-grey-20 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-l">
        <span className="font-body text-body-md-em text-black">{siteName}</span>

        <div className="flex items-center gap-s">
          {links.map((link) => (
            <NavLink key={link.href} label={link.label} href={link.href} />
          ))}
        </div>
      </div>
    </nav>
  );
}
