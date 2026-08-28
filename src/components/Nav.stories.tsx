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
          '`device="Desktop"` — full-width sticky bar, `px-2xl`, inline NavLinks.',
          '`device="Mobile"` — `px-s`, hamburger button that toggles an open/close',
          'panel of stacked NavLinks. Menu state is internal — no prop needed.',
          '',
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

export const MobileClosed: Story = {
  args: { device: 'Mobile' },
}

/** Click the hamburger to open the menu panel. */
export const MobileOpen: Story = {
  args: { device: 'Mobile' },
  play: async ({ canvas }) => {
    const { userEvent } = await import('@storybook/test');
    const btn = canvas.getByRole('button', { name: 'Open menu' });
    await userEvent.click(btn);
  },
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
