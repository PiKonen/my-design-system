import type { Meta, StoryObj } from '@storybook/react-vite'
import { Nav } from './Nav'

const meta = {
  title: 'Components/Nav',
  component: Nav,
  args: {
    logo: 'My App',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Docs', href: '/docs' },
      { label: 'About', href: '/about' },
    ],
  },
  argTypes: {
    logo: { control: 'text' },
  },
  parameters: {
    // Nav is a full-width sticky bar, so the padded default would misrepresent it.
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'A sticky full-width bar: white background, `border-border` bottom rule, and an',
          'inner `max-w-5xl` container so content lines up with the page below it.',
          '',
          'Links are keyed by `href`, so entries must have distinct hrefs. Several links',
          "sharing one href — `'#'` placeholders, say — trigger a React duplicate-key",
          'warning and React may drop or duplicate items. Always pass real paths.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Nav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SingleLink: Story = {
  args: { links: [{ label: 'Home', href: '/' }] },
}

export const ManyLinks: Story = {
  args: {
    links: [
      { label: 'Home', href: '/' },
      { label: 'Components', href: '/components' },
      { label: 'Foundations', href: '/foundations' },
      { label: 'Docs', href: '/docs' },
      { label: 'About', href: '/about' },
    ],
  },
}

/** Sticky behaviour only shows with content to scroll past. */
export const StickyOverContent: Story = {
  render: (args) => (
    <div className="h-96 overflow-y-auto bg-surface">
      <Nav {...args} />
      <div className="max-w-5xl mx-auto p-6 flex flex-col gap-medium">
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i} className="font-body text-base text-body">
            Scroll — the bar stays pinned to the top of this container. Paragraph {i + 1}.
          </p>
        ))}
      </div>
    </div>
  ),
}
