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

## Component contracts
Some components have a contract file in contracts/<ComponentName>.contract.json —
a machine-readable spec of that component's props, states, and which tokens are
brand-overridable vs. locked.

If a contract exists for the component you're creating, editing, or reviewing:
- Read it before touching any code.
- Match its props, states, and variant matrix exactly — don't add, remove, or
  rename anything without updating the contract first and flagging the change.
- Never hardcode a value for a token listed under `brandOverridable` — always
  reference the CSS variable (`cssVar`), never the `core` example value.
- If what you're building doesn't match the contract (a prop is missing, a
  state behaves differently), stop and report the mismatch rather than
  silently building around it or silently updating the contract to match.

If no contract exists yet for a component you're creating, don't invent one
unprompted — ask whether one should be written first.