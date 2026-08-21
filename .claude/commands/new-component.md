---
description: Build a new pinx-ui component from a Figma frame, map it, build, publish, and update the site
---

You are automating the pinx-ui component pipeline. Follow these steps in order.
Argument: $ARGUMENTS — a Figma frame/component URL (must include node-id).

## 1. Pull design context
- Extract the fileKey and nodeId from the URL in $ARGUMENTS.
- Get design context for that node (colors, spacing, typography, variants, states).
- Confirm the node lives on the "Design system core" page. If it's on any other
  page, STOP and ask the user to confirm this is intentional before continuing —
  components belong on Design system core, not scattered across other pages.

## 1a. Check for a component contract
- Look for contracts/<ComponentName>.contract.json.
- If it exists: treat it as authoritative. Match its props, states, and
  variant matrix exactly. Reference brandOverridable tokens by cssVar, never
  by their core value. If the Figma design or requested change doesn't match
  the contract, STOP and report the mismatch instead of building around it.
- If it doesn't exist: proceed as normal, but don't create a contract file
  unprompted — that's a separate, deliberate step.

## 2. Check for an existing Code Connect mapping
- Look up the Code Connect map for this node.
- If a mapping already exists, report it and ask whether the user wants to
  update the existing component or treat this as a new one.
- If no mapping exists, proceed — you'll create one in step 5.

## 3. Write the component
- Create src/components/<ComponentName>.tsx following the conventions in
  this repo's claude.md:
  - One component per file
  - TypeScript props interface at the top of the file
  - Named export (not default)
  - Tailwind classes only — no inline styles, no hardcoded hex/px values
  - Use existing tokens (--color-*, --spacing-*, --radius-*, --font-*) —
    check src/theme.css for the full token list before inventing new values
- If the design needs a token that doesn't exist yet, STOP and flag it —
  don't silently add a one-off value.
- Match variants/states shown in the Figma node (hover, disabled, error, etc.)
  as props, not separate components.

## 4. Export it
- Add the new component to src/index.ts, alongside the existing exports.

## 5. Create or update the Code Connect mapping
- Map the Figma node (and any relevant variant/child nodes) to the new
  component file, e.g. src/components/<ComponentName>.tsx.
- Use the actual exported component name (no ".tsx" suffix) as componentName —
  this exact mistake has happened before on this repo, so double check it.
- Read the mapping back after writing it to confirm it actually saved
  (writes to Code Connect have silently failed to persist before).

## 6. Build and verify
Run:
    npm run build:lib
Confirm all four of these exist and are non-empty afterward:
    dist/index.js
    dist/index.d.ts
    dist/index.css
    dist/theme.css
If any are missing or the build errors, STOP and report the error — do not
proceed to publish a broken build.

## 7. Pause for review
Show the user:
- The full contents of the new component file
- The Code Connect mapping that was created/updated
- A one-line description of what changed
Ask: "Ready to bump the version and publish?" and wait for explicit confirmation
before continuing. Do not publish without this confirmation.

## 8. Version and publish
- Ask whether this is a patch (fix/tweak) or minor (new component/variant) bump
  if it isn't obvious — a brand new component is normally minor.
- Run the appropriate `npm version patch` or `npm version minor`.
- Run `npm publish`.
- Confirm the new version actually appears on the npm registry
  (fetch https://registry.npmjs.org/pinx-ui and check dist-tags.latest)
  before declaring success — publish has failed silently-ish before
  (auth errors returning misleading 404s).

## 9. Update the consuming site
- In the my-website repo, update the pinx-ui dependency to the new version.
- Run `npm install` there and confirm it resolves without errors.
- If the new component is meant to be used immediately, ask the user where
  on the site it should go — don't guess placement.

## 10. Summary
Report back concisely:
- Component name and what it does
- Figma node it's mapped to
- New pinx-ui version published
- Whether my-website was updated
