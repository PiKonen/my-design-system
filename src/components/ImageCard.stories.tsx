import type { Meta, StoryObj } from '@storybook/react-vite'
import { ImageCard } from './ImageCard'
import villageSquare from '../assets/village-square.jpg'

const meta = {
  title: 'Components/ImageCard',
  component: ImageCard,
  args: {
    src: villageSquare,
    alt: 'A sunlit village square lined with earthen buildings',
    title: 'Ghardaïa',
    description: 'Midday light across the old square.',
  },
  argTypes: {
    alt: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    href: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-lg">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: [
          'Figma: my-website › Image (node 17:20) — a bare image at `radius-md` (8px).',
          '',
          'Mirrors `Card`: width-fluid, `overflow-hidden` so the image bleeds to the',
          'rounded edge, and passing `href` renders an anchor with the hover elevation',
          '(`shadow-raised`). Without `href` it is a static div.',
          '',
          'Two things are deliberate departures. The radius is `radius-md`, not Card\'s',
          '`radius-lg`, because the Figma node draws it at 8px. And the caption panel',
          '(title + description, bottom-right, fading in on hover) is not in the Figma',
          'node — it is additive behaviour, reusing Card\'s type pair reversed onto',
          '`text-white` over a `bg-black/60` scrim for legibility on any photo.',
          '',
          'The caption also appears on keyboard focus, so the link variant is not',
          'hover-only.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof ImageCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** Passing `href` makes the image a link and turns on the hover elevation. */
export const Linked: Story = {
  args: { href: '#' },
}

/**
 * Omitting both `title` and `description` drops the caption panel entirely, so
 * the image stays bare in every state — the gallery case, a grid of photographs
 * with no per-image copy, and Figma's State=Default.
 */
export const NoCaption: Story = {
  args: { title: undefined, description: undefined },
}

/** A longer description wraps inside the panel's 70% max width. */
export const LongDescription: Story = {
  args: {
    description:
      'Midday light rakes across the old square, throwing the arcades into deep shade.',
  },
}
