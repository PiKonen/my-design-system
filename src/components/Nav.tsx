import { useState } from 'react';
import { NavLink } from './NavLink';
import { Close } from './icons/Close';

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface NavProps {
  siteName: string;
  links: NavItem[];
  device?: 'Desktop' | 'Mobile';
}

// Figma: Design system PI › Navigation (node 389:46)
//   Device=Desktop         — px-2xl py-xs, siteName left + NavLinks right.
//   Device=Mobile, closed  — px-s py-xs, siteName left + hamburger right.
//   Device=Mobile, open    — same bar with Close icon; full-width link panel drops below.
//
// menuOpen is internal state — callers don't control it. The panel closes
// automatically when the user follows a link (navigation unmounts the component)
// or taps the ✕ button.
//
// Hamburger bar dimensions (20 × 2px) are icon geometry, not spacing tokens.
export function Nav({ siteName, links, device = 'Desktop' }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = device === 'Mobile';

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-grey-20 bg-white">

      {/* Top bar — identical structure in all three states */}
      <div className={`flex items-center justify-between py-xs ${isMobile ? 'px-s' : 'px-2xl'}`}>
        <span className="font-body text-body-md-em text-black">{siteName}</span>

        {!isMobile ? (
          /* Desktop: inline NavLinks */
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
        ) : menuOpen ? (
          /* Mobile open: Close icon */
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            aria-expanded={true}
            aria-controls="nav-mobile-menu"
            className="rounded-sm p-2xs"
          >
            <Close size={24} />
          </button>
        ) : (
          /* Mobile closed: hamburger */
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={false}
            aria-controls="nav-mobile-menu"
            className="flex flex-col items-start gap-3xs rounded-sm p-2xs"
          >
            <span className="block h-[2px] w-5 rounded-full bg-black" />
            <span className="block h-[2px] w-5 rounded-full bg-black" />
            <span className="block h-[2px] w-5 rounded-full bg-black" />
          </button>
        )}
      </div>

      {/* Mobile menu panel */}
      {isMobile && menuOpen && (
        <div
          id="nav-mobile-menu"
          className="flex flex-col gap-s border-t border-grey-20 px-s py-xs"
        >
          {links.map((link) => (
            <NavLink
              key={link.href}
              label={link.label}
              href={link.href}
              active={link.active}
            />
          ))}
        </div>
      )}

    </nav>
  );
}
