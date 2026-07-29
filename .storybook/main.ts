import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  // Foundations MDX pages live in src/foundations; stories sit next to components.
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  typescript: {
    // The default react-docgen does not reliably pull prop types out of a
    // separately-declared interface, and this design system puts every
    // component's props in one — without this the autodocs prop tables and the
    // JSDoc descriptions come out empty.
    //
    // reactDocgenTypescriptOptions is deliberately not set: its type resolves to
    // `undefined` in @storybook/react-vite (the underlying plugin's Parameters<>
    // lookup does not resolve), so passing options here is a type error. Nothing
    // is lost — no component in this library spreads HTML props, so React's own
    // attributes never pollute the tables, and union-typed props get explicit
    // argTypes in their story files rather than relying on docgen inference.
    reactDocgen: 'react-docgen-typescript',
  },
}

export default config
