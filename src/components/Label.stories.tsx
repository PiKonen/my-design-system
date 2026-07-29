import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './Label'

const meta = {
  title: 'Components/Label',
  component: Label,
  args: {
    label: 'Email address',
  },
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'A `text-body` span in the body font, used to caption form fields.',
          '',
          'Note that `disabled` here dims via `opacity-50` rather than switching to the',
          '`body-disabled` colour token, so it does not match the disabled treatment used',
          'by Checkbox and Radio. Flagged rather than changed — the two conventions are',
          'worth reconciling.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: { disabled: true },
}

export const BothStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-small">
      <Label label="Default" />
      <Label label="Disabled" disabled />
    </div>
  ),
}
