// url=https://www.figma.com/design/BPK4nPzVTPPb8wOYUZnD71/Design-system-PI?node-id=345-33
// source=src/components/NavLink.tsx
// component=NavLink
import figma from 'figma'

const instance = figma.selectedInstance

const label = instance.getString('Label')

// `Property 1` is mapped for one of its four values. Default, hover and focus
// are all CSS pseudo-states in code, so NavLink has no prop for any of them and
// inventing one would emit code that does not compile — those three keep
// emitting the same snippet, the same mapping the Image Card set documents for
// its State axis. Active is different: it says which page the visitor is on,
// which is a prop, so it emits one.
const property1 = instance.getEnum('Property 1', {
  Default: 'default',
  hover: 'default',
  focus: 'default',
  Active: 'active',
})

// `href` has no Figma counterpart — a link target is authored per use, not per
// design — so it is emitted as a placeholder for the developer to fill.
export default {
  example: figma.code`
    <NavLink label="${label}" href="#" ${property1 === 'active' ? 'active' : ''} />
  `,
  imports: ['import { NavLink } from "pinx-ui"'],
  id: 'nav-link',
  metadata: { nestable: true },
}
