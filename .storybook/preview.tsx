import type { Preview } from '@storybook/react-vite'

// The single most important line in this file. Storybook builds its own entry and
// never touches src/main.tsx, so without this import the @theme design tokens and
// the Google Fonts @import are absent and every component renders unstyled.
import '../src/index.css'

// Storybook-only — lets the Brand toolbar below preview the filial override
// live, without needing a second deployment. See the file for why this is
// safe to keep out of the published package.
import './brand-overrides.css'

// Adds the paintbrush icon + dropdown to Storybook's own toolbar (top of the
// canvas, not a per-story control) so any story can be checked against both
// brands without editing story files. `core` needs no override at all — the
// tokens loaded above via index.css already are the core brand.
export const globalTypes = {
  brand: {
    name: 'Brand',
    description: 'Preview a brand colour override',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'core', title: 'Core (purple)' },
        { value: 'filial', title: 'Filial (orange)' },
      ],
      showName: true,
    },
  },
}

const preview: Preview = {
  parameters: {
    // Default sort is alphabetical, which would put Components above Foundations.
    // Tokens come first in a design system — you read them before the components
    // that consume them.
    options: {
      storySort: {
        order: ['Foundations', ['Colors', 'Typography', 'Spacing', 'Radius', 'Icons'], 'Components'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Components are designed against white and the surface grey, so make both
    // one click away. Values are var() references rather than literal hex: the
    // preview iframe has index.css loaded, so these resolve to the real tokens
    // and cannot drift from them.
    backgrounds: {
      options: {
        white: { name: 'White', value: 'var(--color-white)' },
        surface: { name: 'Surface', value: 'var(--color-surface)' },
        black: { name: 'Black', value: 'var(--color-black)' },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'white' },
    brand: 'core',
  },
  // The wrapper is unconditional — data-brand="core" is harmless (no CSS
  // targets it) — so the decorator never needs to branch on which brand is
  // selected, just pass the current one through.
  decorators: [
    (Story, context) => (
      <div data-brand={context.globals.brand}>
        <Story />
      </div>
    ),
  ],
  // Give every component an auto-generated API page built from its props
  // interface, without tagging each story file individually.
  tags: ['autodocs'],
}

export default preview
