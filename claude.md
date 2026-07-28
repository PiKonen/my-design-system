# CLAUDE.md

This is a React + TypeScript design system using Vite and Tailwind CSS v4.

## Design tokens
Colors and fonts are defined as CSS variables in the @theme block
in src/index.css — always use Tailwind classes, never hardcode hex values.

Primary color classes: bg-primary, bg-primary-dark, bg-primary-light
Surface: bg-surface
Border: border-border

Fonts:
- Display headings: font-display
- Body text: font-body

Spacing: 
- Use spacing that is defined in index.css


## Component rules
- One component per file in src/components/
- Use TypeScript interfaces for all props
- Export components as named exports
- Use Tailwind classes only — no inline styles
- Every component needs a props interface at the top of the file