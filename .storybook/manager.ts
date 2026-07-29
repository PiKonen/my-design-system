import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

// Makes the sidebar title a link back to the app's reference page, so the two
// halves of the design system are navigable in both directions.
//
// brandUrl is '/' to match the relative /storybook link in the app's nav: once the
// built Storybook is served alongside the app, '/' is the app root and the round
// trip works. Caveat while developing — with `storybook dev` on its own port, '/'
// is Storybook's own root, so the brand link just reloads Storybook. Set it to
// http://localhost:5173 locally if you want the round trip during development.
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'My Design System',
    brandUrl: '/',
    brandTarget: '_self',
  }),
})
