// url=https://www.figma.com/design/BPK4nPzVTPPb8wOYUZnD71/Design-system-PI?node-id=328-22
// source=src/components/ImageCard.tsx
// component=ImageCard
import figma from 'figma'

const instance = figma.selectedInstance

const title = instance.getString('Title')
const description = instance.getString('Description')

// `State` is a CSS state in code, not a prop — ImageCard has no `state` prop and
// inventing one would emit invalid code. The one real lever it corresponds to is
// `href`: without it the component renders a plain div with no hover elevation, so
// the Hover variant is only reachable on the linked form. This is the same mapping
// the Card component set documents in Figma.
const state = instance.getEnum('State', {
  Default: 'default',
  Hover: 'hover',
})

// `src` and `alt` have no Figma counterpart — the component set uses a placeholder
// rect (color/ui/default-bg), and alt text is authored per use, not per design. Both
// are required props, so they are emitted as placeholders for the developer to fill.
//
// `title` and `description` are optional props, so an empty Figma text property is
// omitted rather than emitted as `title=""`. Clearing both yields the bare,
// caption-less form — the gallery case.
export default {
  example: figma.code`
    <ImageCard
      src={imageSrc}
      alt="Describe the image for screen readers"
      ${title ? `title="${title}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${state === 'hover' ? 'href="#"' : ''}
    />
  `,
  imports: ['import { ImageCard } from "pinx-ui"'],
  id: 'image-card',
  metadata: { nestable: true },
}
