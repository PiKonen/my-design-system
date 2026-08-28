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


## Figma access — the identity check is mandatory

This repo's Figma file is `Design-system-PI`, fileKey `BPK4nPzVTPPb8wOYUZnD71`, and it
belongs to the **Nitor** account. There are two separate Figma identities on this
machine and they must not mix:

- ✅ `paula.ikonen@nitor.com` — handle "Paula Ikonen", plan `Nitor`, tier `org`
- ❌ `ext-paula.1.ikonen@sok.fi` — handle "Ikonen Paula (EXT), Nitor Group Oy", plan
  `SOK`, tier `enterprise`

The SOK handle contains the word "Nitor", so the handle alone does NOT identify the
account. Check `email` and `plans[].name`.

Before the first Figma MCP call in any session that touches this repo:

1. Call `whoami` and state the email in your reply.
2. If it is not `paula.ikonen@nitor.com`, **stop**. Do not read, screenshot, export or
   write any Figma node. Report the connected identity and ask for a re-auth.

Never work around a Figma access error by trying a different account, file key or node.
`"you don't have edit access to this file"` here means the wrong identity is connected —
it does not mean the target was wrong. Note also that the Figma MCP requires **edit**
access, not view, and that its token is machine-global: re-logging into figma.com in a
browser does not change it, only `/mcp` → clear authentication does.

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