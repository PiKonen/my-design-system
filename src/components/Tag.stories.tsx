import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag } from './Tag'

const meta = {
  title: 'Components/Tag',
  component: Tag,
  args: {
    label: 'Tag',
  },
  argTypes: {
    // Declared explicitly rather than inferred: main.ts does not pass
    // reactDocgenTypescriptOptions, so union props would otherwise render as a
    // free-text control instead of a picker.
    variant: {
      control: 'inline-radio',
      options: ['neutral', 'primary', 'secondary'],
      description: 'Figma `Variant` property.',
    },
    label: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Figma: Design system PI › Tag (node 341:24) — `Variant` = 3 variants.',
          '',
          'There is no state axis, and deliberately so: a tag labels content rather than',
          'responding to it, so it renders as a `span` with nothing to hover, focus or',
          'press. If it ever needs to be dismissible or filterable it becomes an',
          'interactive element, and that belongs in Figma before it lands here.',
          '',
          'Each variant is a tonal pair from a single ramp — the 100 step as the fill under',
          'the 800 step as the label. The 800 steps are the darkest on each ramp, so all',
          'three pairs clear 4.5:1 at 14px. Secondary has to reach that far down because',
          'its 600 step is the documented dead zone that fails against both white and',
          'black.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Neutral: Story = {
  args: { variant: 'neutral' },
}

export const Primary: Story = {
  args: { variant: 'primary' },
}

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

/** All three variants side by side — the whole set in one frame. */
export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-2xs">
      <Tag label="Neutral" variant="neutral" />
      <Tag label="Primary" variant="primary" />
      <Tag label="Secondary" variant="secondary" />
    </div>
  ),
}

/** Tags hug their label, so they stay pill-shaped at any content length. */
export const VaryingLengths: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-2xs">
      <Tag label="UX" variant="primary" />
      <Tag label="Design systems" variant="primary" />
      <Tag label="Accessibility and inclusive design" variant="primary" />
    </div>
  ),
}
