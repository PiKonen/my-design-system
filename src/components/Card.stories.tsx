import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './Card'
import heroImage from '../assets/hero.png'

const BODY =
  'A short supporting sentence that shows how body copy wraps inside the card at its natural width.'

const meta = {
  title: 'Components/Card',
  component: Card,
  args: {
    heading: 'Build your own team library',
    body: BODY,
  },
  argTypes: {
    heading: { control: 'text' },
    body: { control: 'text' },
    href: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: [
          'Figma: Design system PI › Card (node 275:23) — `State` = Default · Hover.',
          '',
          '`radius-lg` corners with `overflow-hidden`, so an image bleeds to the rounded',
          'edge. Passing `href` renders an anchor and enables the hover elevation',
          '(`shadow-raised`, matching Figma\'s shadow/raised effect style); without it the',
          'card is a static div with no hover state.',
          '',
          'Heading and body are differentiated by size and weight, not colour — both use',
          'full-strength `text-body`.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithImage: Story = {
  args: { image: heroImage },
}

/** Passing `href` makes the card a link and turns on the hover elevation. */
export const Linked: Story = {
  args: { image: heroImage, href: '#' },
}

export const HeadingOnly: Story = {
  args: { body: '' },
}
