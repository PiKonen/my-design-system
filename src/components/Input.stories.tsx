import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'
import { fn } from 'storybook/test'
import { Input } from './Input'

const onChange = fn()

const meta = {
  title: 'Components/Input',
  component: Input,
  // Input is controlled: rendered straight from args the field would refuse every
  // keystroke, since `value` is pinned to the control. Writing back through
  // useArgs makes it typeable and keeps the Controls panel showing the live value.
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <Input
        {...args}
        onChange={(next) => {
          updateArgs({ value: next })
          args.onChange(next)
        }}
      />
    )
  },
  args: {
    label: 'Email address',
    value: '',
    placeholder: 'name@example.com',
    onChange,
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  // The field is full-width, so give it a realistic form column rather than the
  // whole viewport.
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: [
          'Figma: Design system PI › TextArea (node 18:5).',
          '',
          '`spacing-medium` inset, `radius-md` corners, `text/body/md` for the value.',
          'Focus and disabled both thicken the border to 2px rather than changing the box,',
          'so neither shifts layout.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithValue: Story = {
  args: { value: 'paula@example.com' },
}

export const WithError: Story = {
  args: { value: 'not-an-email', error: 'Enter a valid email address' },
}

export const Disabled: Story = {
  args: { disabled: true, value: 'paula@example.com' },
}

export const NoLabel: Story = {
  args: { label: undefined },
}
