import type { Meta, StoryObj } from '@storybook/react-vite'
import { Nav } from './Nav'

const meta = {
  title: 'Components/Nav',
  component: Nav,
  args: {
    siteName: 'My Portfolio',
    links: [
      { label: 'Work', href: '/work' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  argTypes: {
    siteName: { control: 'text' },
  },
  parameters: {
    // Nav is a full-width sticky bar, so the padded default would misrepresent it.
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'Figma: Design system PI › Navigation (node 345:18).',
          '',
          'A sticky full-width bar — white background, `color/ui/grey-20` bottom rule, and',
          'an inner `max-w-5xl` container so content lines up with the page below it.',
          '',
          'The links are `NavLink` instances, matching the Figma node. Hover and focus',
          'therefore belong to NavLink and cannot be set from the controls panel — point',
          'at a link for the tinted pill, or Tab to it for the ring.',
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
  args: { links: [{ label: 'Work', href: '/work' }] },
}

export const ManyLinks: Story = {
  args: {
    links: [
      { label: 'Work', href: '/work' },
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
      <div className="max-w-5xl mx-auto p-6 flex flex-col gap-s">
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i} className="font-body text-base text-body">
            Scroll — the bar stays pinned to the top of this container. Paragraph {i + 1}.
          </p>
        ))}
      </div>
    </div>
  ),
}
