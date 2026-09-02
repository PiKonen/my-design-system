import type { Meta, StoryObj } from '@storybook/react-vite'
import { Footer } from './Footer'

const meta = {
  title: 'Components/Footer',
  component: Footer,
  args: {
    copyright: 'copyright 2026',
    tagline: 'UX · UI · Visual design · Copy',
  },
  argTypes: {
    copyright: { control: 'text' },
    tagline: { control: 'text' },
  },
  parameters: {
    // Footer is full-width and carries no inline padding, so the default
    // centred layout would misrepresent it.
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'Figma: Design system PI › Footer (node 396:30).',
          '',
          'No State axis — a footer neither responds to interaction nor carries an',
          'affordance, so there is nothing to hover, focus or press.',
          '',
          'The layout is responsive, and this is the one place the code is',
          'deliberately ahead of Figma: node 396:30 has no variant axes, so it',
          'describes the desktop row only. Implemented literally, the two',
          '`whitespace-nowrap` strings overflow a phone viewport — so the mobile',
          'treatment below is carried in code until the Figma component gets a',
          '`Device` variant the way Navigation (389:46) has one.',
          '',
          '- below `md` — stacked column, `gap-2xs`, `text/body/s`, `pt-l pb-2xs`',
          '- `md` and up — row, `items-end`, `justify-between`, `text/body/md`,',
          '  `pt-xl pb-m`',
          '',
          'Note it has **no inline padding** on purpose. Figma\'s frame carries',
          '`px-s`, but that 1344px frame is the page container rather than the',
          'footer, and every real consumer already owns the gutter — so adding it',
          'here would double-pad them. That is why the Desktop story below runs',
          'edge to edge, and why InPageContainer is the more representative view.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

/** Row layout, `md` and up. Runs edge to edge — the component owns no gutter. */
export const Desktop: Story = {}

/** Stacked at `text/body/s`. Small mobile is 320px, below Tailwind's 768px `md`. */
export const Mobile: Story = {
  globals: { viewport: { value: 'mobile1', isRotated: false } },
}

/**
 * How the live site uses it: inside a container that supplies the inline
 * gutter (`px-l`, `md:px-xl`). Resize the canvas across 768px to see it swap.
 */
export const InPageContainer: Story = {
  render: (args) => (
    <div className="bg-white">
      <div className="mx-auto flex max-w-5xl flex-col px-l md:px-xl">
        <p className="font-body text-body-md text-body">
          Page content sits above the footer; the container, not the footer,
          owns the inline padding.
        </p>
        <Footer {...args} />
      </div>
    </div>
  ),
}
