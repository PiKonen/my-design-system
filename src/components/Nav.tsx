interface NavLink {
  label: string;
  href: string;
}

interface NavProps {
  logo: string;
  links: NavLink[];
}

export function Nav({ logo, links }: NavProps) {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-display font-bold text-base">{logo}</span>
        <div className="flex gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
