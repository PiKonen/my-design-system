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
// Close button is explicitly 36×30px (h-[30px] w-[36px]) to match the hamburger
// button's geometry — if it were p-2xs (8px) around a 24px icon it would be 40px
// and the bar would jump 10px taller when the menu opens. Icon geometry, not tokens.
//
// Mobile panel uses plain <a> block links (not NavLink) because the Figma
// "Navigation links" frame (node 391:43) stacks 51px-tall frames with py-s (16px)
// internal padding and zero gap — the NavLink pill shape doesn't apply here.
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
          /* Mobile open: Close — 36×30px to match hamburger height */
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            aria-expanded={true}
            aria-controls="nav-mobile-menu"
            className="flex h-[30px] w-[36px] items-center justify-center rounded-sm"
          >
            <Close size={24} />
          </button>
        ) : (
          /* Mobile closed: hamburger — p-2xs (8px) + 3×2px lines + 2×4px gaps = 30px */
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

      {/* Mobile menu panel — block links, py-s each, zero gap (Figma node 391:43) */}
      {isMobile && menuOpen && (
        <div
          id="nav-mobile-menu"
          className="border-t border-grey-20 px-s py-2xs"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={link.active ? 'page' : undefined}
              className={`block py-s font-body text-button-s transition-colors focus-visible:outline-2 focus-visible:outline-primary-700 ${
                link.active ? 'bg-primary-800 text-white' : 'text-grey-80 hover:bg-primary-100'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

    </nav>
  );
}
