// url=https://www.figma.com/design/BPK4nPzVTPPb8wOYUZnD71/Design-system-PI?node-id=345-33
// source=src/components/NavLink.tsx
// component=NavLink
import figma from 'figma'

const instance = figma.selectedInstance

const label = instance.getString('Label')

// `Property 1` is not mapped: Default, hover and focus are all CSS pseudo-states
// in code, so NavLink has no prop for any of them and inventing one would emit
// code that does not compile. All three variants therefore emit the same
// snippet. This is the same mapping the Image Card set documents for its State
// axis.
//
// `href` has no Figma counterpart — a link target is authored per use, not per
// design — so it is emitted as a placeholder for the developer to fill.
export default {
  example: figma.code`
    <NavLink label="${label}" href="#" />
  `,
  imports: ['import { NavLink } from "pinx-ui"'],
  id: 'nav-link',
  metadata: { nestable: true },
}
