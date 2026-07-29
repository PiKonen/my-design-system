import type { Preview } from '@storybook/react-vite'

// The single most important line in this file. Storybook builds its own entry and
// never touches src/main.tsx, so without this import the @theme design tokens and
// the Google Fonts @import are absent and every component renders unstyled.
import '../src/index.css'

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
  },
  // Give every component an auto-generated API page built from its props
  // interface, without tagging each story file individually.
  tags: ['autodocs'],
}

export default preview
