import type { Meta, StoryObj } from '@storybook/react-vite'
import { Nav } from './Nav'

const meta = {
  title: 'Components/Nav',
  component: Nav,
  args: {
    siteName: 'My Portfolio',
    device: 'Desktop',
    links: [
      { label: 'Work', href: '/work' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Log In', href: '/login' },
    ],
  },
  argTypes: {
    siteName: { control: 'text' },
    device: { control: 'radio', options: ['Desktop', 'Mobile'] },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'Figma: Design system PI › Navigation (node 389:46).',
          '',
          'A sticky full-width bar — white background, `color/ui/grey-20` bottom rule.',
          '`device="Desktop"` shows NavLink items with `px-2xl` (64px) horizontal inset.',
          '`device="Mobile"` shows a hamburger button with `px-s` (16px) inset.',
          '',
          'Pass `onMenuClick` to handle the hamburger button press in Mobile mode.',
          'The links are `NavLink` instances; hover and focus belong to NavLink.',
          'Pass `active: true` on a link item to mark the current page.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Nav>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {}

export const DesktopWithActive: Story = {
  args: {
    links: [
      { label: 'Work', href: '/work', active: true },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Log In', href: '/login' },
    ],
  },
}

export const Mobile: Story = {
  args: { device: 'Mobile' },
}

export const MobileMenuClick: Story = {
  args: {
    device: 'Mobile',
    onMenuClick: () => alert('menu clicked'),
  },
  name: 'Mobile — onMenuClick wired',
}

/** Sticky behaviour only shows with content to scroll past. */
export const StickyOverContent: Story = {
  render: (args) => (
    <div className="h-96 overflow-y-auto bg-surface">
      <Nav {...args} />
      <div className="mx-auto max-w-5xl flex flex-col gap-s p-6">
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i} className="font-body text-base text-body">
            Scroll — the bar stays pinned to the top of this container. Paragraph {i + 1}.
          </p>
        ))}
      </div>
    </div>
  ),
}
