import { NavLink } from './NavLink';

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface NavProps {
  siteName: string;
  links: NavItem[];
  device?: 'Desktop' | 'Mobile';
  onMenuClick?: () => void;
}

// Figma: Design system PI › Navigation (node 389:46)
//   Device=Desktop — full-width, px-2xl py-xs, siteName left + NavLinks right.
//   Device=Mobile  — full-width, px-s   py-xs, siteName left + hamburger right.
//
// The old max-w-5xl container is retired now that --spacing-2xl (64px) covers
// the Desktop horizontal inset the Figma node binds. Both variants are sticky
// and span the full viewport width.
//
// Hamburger bar dimensions (20 × 2px) are icon geometry, not spacing tokens;
// w-5 (Tailwind 20px) is used rather than a spacing step.
export function Nav({ siteName, links, device = 'Desktop', onMenuClick }: NavProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-grey-20 bg-white">
      <div
        className={`flex items-center justify-between py-xs ${
          device === 'Mobile' ? 'px-s' : 'px-2xl'
        }`}
      >
        <span className="font-body text-body-md-em text-black">{siteName}</span>

        {device === 'Desktop' ? (
          <div className="flex items-center gap-3xs">
            {links.map((link) => (
              <NavLink
                key={link.href}
                label={link.label}
                href={link.href}
                active={link.active}
              />
            ))}
          </div>
        ) : (
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open menu"
            className="flex flex-col items-start gap-3xs rounded-sm p-2xs"
          >
            <span className="block h-[2px] w-5 rounded-full bg-black" />
            <span className="block h-[2px] w-5 rounded-full bg-black" />
            <span className="block h-[2px] w-5 rounded-full bg-black" />
          </button>
        )}
      </div>
    </nav>
  );
}
