import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'
import { fn } from 'storybook/test'
import { Radio } from './Radio'

const onChange = fn()

const meta = {
  title: 'Components/Radio',
  component: Radio,
  // Same controlled-component problem as Checkbox: `checked` is pinned to the
  // control, so writing back through useArgs is what makes the single radio in
  // Playground actually respond.
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <Radio
        {...args}
        onChange={(next) => {
          updateArgs({ checked: next === args.value })
          args.onChange(next)
        }}
      />
    )
  },
  args: {
    name: 'playground',
    value: 'a',
    checked: false,
    label: 'Option A',
    onChange,
  },
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Figma: Design system PI › Radiobutton (node 149:8).',
          '',
          'Same 24px-in-28px geometry as Checkbox, but fully rounded. Figma binds the',
          'radius to `radius/lg` (12px), which on a 24px box *is* the circle; the code uses',
          '`rounded-full` so it stays a circle if that size ever changes.',
          '',
          'The selected glyph is a checkmark, not a dot — that is what the design uses, and',
          'it is the same asset the Checkbox renders.',
          '',
          'Note that a lone radio cannot be deselected, which is inherent to radios rather',
          'than a quirk of this component. The group stories below are the realistic view.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

/** A single radio, driven by the Controls panel. */
export const Playground: Story = {}

// Radios only make sense as a group with one shared selection, which a single args
// object cannot express — so these stories hold the selection locally instead.
function Group({
  name,
  options,
  initial,
  error = false,
  disabled = false,
}: {
  name: string
  options: { value: string; label: string }[]
  initial: string
  error?: boolean
  disabled?: boolean
}) {
  const [choice, setChoice] = useState(initial)

  return (
    <div className="flex flex-col gap-2xs">
      {options.map((option) => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          checked={choice === option.value}
          error={error}
          disabled={disabled}
          onChange={(next) => {
            setChoice(next)
            onChange(next)
          }}
        />
      ))}
    </div>
  )
}

const OPTIONS = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
]

/** A working group — click between the options. */
export const DefaultGroup: Story = {
  parameters: { controls: { disable: true } },
  render: () => <Group name="default" options={OPTIONS} initial="a" />,
}

export const ErrorGroup: Story = {
  parameters: { controls: { disable: true } },
  render: () => <Group name="error" options={OPTIONS} initial="b" error />,
}

export const DisabledGroup: Story = {
  parameters: { controls: { disable: true } },
  render: () => <Group name="disabled" options={OPTIONS} initial="a" disabled />,
}

/** Every state side by side. */
export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-l">
      <div className="flex flex-col gap-2xs">
        <span className="font-body text-sm text-body-disabled">Default</span>
        <Group name="all-default" options={OPTIONS.slice(0, 2)} initial="a" />
      </div>
      <div className="flex flex-col gap-2xs">
        <span className="font-body text-sm text-body-disabled">Error</span>
        <Group name="all-error" options={OPTIONS.slice(0, 2)} initial="a" error />
      </div>
      <div className="flex flex-col gap-2xs">
        <span className="font-body text-sm text-body-disabled">Disabled</span>
        <Group name="all-disabled" options={OPTIONS.slice(0, 2)} initial="a" disabled />
      </div>
    </div>
  ),
}
