// url=https://www.figma.com/design/BPK4nPzVTPPb8wOYUZnD71/Design-system-PI?node-id=341-24
// source=src/components/Tag.tsx
// component=Tag
import figma from 'figma'

const instance = figma.selectedInstance

const label = instance.getString('Label')

const variant = instance.getEnum('Variant', {
  Neutral: 'neutral',
  Primary: 'primary',
  Secondary: 'secondary',
})

// `variant` is omitted when it resolves to Neutral: that is the component's
// default, so emitting it would add a prop that changes nothing. Same reasoning
// the Image Card template uses for its empty caption props.
//
// There is no `state` mapping here because the Figma set has no State axis — a
// tag is not interactive. If a State axis is ever added, it belongs in Figma
// first, not as an invented prop in this template.
export default {
  example: figma.code`
    <Tag
      label="${label}"
      ${variant !== 'neutral' ? `variant="${variant}"` : ''}
    />
  `,
  imports: ['import { Tag } from "pinx-ui"'],
  id: 'tag',
  metadata: { nestable: true },
}
