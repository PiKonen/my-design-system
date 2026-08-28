import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'
import { fn } from 'storybook/test'
import { Checkbox } from './Checkbox'

const onChange = fn()

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  // Checkbox is controlled, so rendered straight from args it would never visibly
  // toggle — `checked` stays pinned to whatever the control says. Writing back
  // through useArgs instead of local state makes the binding two-way: clicking the
  // box updates the Controls panel, and editing the control updates the box.
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <Checkbox
        {...args}
        onChange={(next) => {
          updateArgs({ checked: next })
          args.onChange(next)
        }}
      />
    )
  },
  args: {
    label: 'I agree to the terms',
    checked: false,
    onChange,
  },
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Figma: Design system PI › Checkbox (node 30:23).',
          '',
          'A 24px box at `radius-sm` inside a 28px slot. Focus is a 1px outline at 1px',
          'offset, which lands exactly on the 28px outer edge and — being an outline —',
          'cannot shift layout.',
          '',
          '`indeterminate` is a DOM property rather than an attribute, so the component',
          'sets it through a ref; without that the state is invisible to assistive tech.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Checked: Story = {
  args: { checked: true },
}

/** Fill matches Selected; only the glyph differs — a dash instead of a check. */
export const Indeterminate: Story = {
  args: { indeterminate: true },
}

export const Error: Story = {
  args: { error: true, label: 'This field is required' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const SelectedDisabled: Story = {
  args: { checked: true, disabled: true },
}

// Each box in the matrix below needs its own state, which one shared args object
// cannot provide — so this wrapper holds it locally. It seeds from `initial` once
// and never syncs back, which is exactly right here: nothing external drives it.
function Standalone({
  initial,
  ...rest
}: { initial: boolean } & Omit<ComponentProps<typeof Checkbox>, 'checked' | 'onChange'>) {
  const [checked, setChecked] = useState(initial)
  return (
    <Checkbox
      {...rest}
      checked={checked}
      onChange={(next) => {
        setChecked(next)
        onChange(next)
      }}
    />
  )
}

/** Every state side by side, each independently clickable. */
export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-2xs">
      <Standalone label="Unchecked" initial={false} />
      <Standalone label="Checked" initial />
      <Standalone label="Indeterminate" initial={false} indeterminate />
      <Standalone label="Error" initial={false} error />
      <Standalone label="Error checked" initial error />
      <Standalone label="Disabled" initial={false} disabled />
      <Standalone label="Selected disabled" initial disabled />
      <Standalone label="Indeterminate disabled" initial={false} indeterminate disabled />
    </div>
  ),
}
