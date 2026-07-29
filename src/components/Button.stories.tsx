import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Button } from './Button'

const onClick = fn()

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    label: 'Button',
    onClick,
  },
  argTypes: {
    // Declared explicitly rather than inferred: main.ts does not pass
    // reactDocgenTypescriptOptions, so union props would otherwise render as a
    // free-text control instead of a picker.
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary'],
      description: "Figma `Variant` property.",
    },
    size: {
      control: 'inline-radio',
      options: ['large', 'small'],
      description:
        'Figma `Size` property. Carries padding and type only — the colour ramp is shared between sizes.',
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Figma: Design system PI › Button (node 1:231) — `Variant` × `State` × `Size` = 20 variants.',
          '',
          'Hover, focus and pressed are CSS pseudo-states, so they cannot be set from the',
          'controls panel — interact with the story to see them. The 2px border is always',
          'present (transparent on primary until focused) so focusing never shifts layout.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Primary: Story = {
  args: { variant: 'primary' },
}

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const Small: Story = {
  args: { size: 'small' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

/** Both variants at both sizes, enabled and disabled — the whole set in one frame. */
export const Matrix: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-medium">
      {(['large', 'small'] as const).map((size) => (
        <div key={size} className="flex flex-wrap items-center gap-medium">
          <span className="w-12 font-body text-sm text-body-disabled">{size}</span>
          <Button label="Button" variant="primary" size={size} onClick={onClick} />
          <Button label="Button" variant="secondary" size={size} onClick={onClick} />
          <Button label="Button" variant="primary" size={size} onClick={onClick} disabled />
          <Button label="Button" variant="secondary" size={size} onClick={onClick} disabled />
        </div>
      ))}
    </div>
  ),
}
