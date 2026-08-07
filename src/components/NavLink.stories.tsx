import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavLink } from './NavLink'

const meta = {
  title: 'Components/NavLink',
  component: NavLink,
  args: {
    label: 'Work',
    href: '#',
  },
  argTypes: {
    label: { control: 'text' },
    href: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Figma: Design system PI › Navi link (node 345:33) — `Property 1` (Default ·',
          'hover · focus), plus a Label text property.',
          '',
          'Hover and focus are CSS pseudo-states, so neither can be set from the controls',
          'panel — point at the link for the tinted pill, or Tab to it for the ring. The',
          'ring is an outline rather than a border, because Figma draws it as a 2px stroke',
          'at strokeAlign OUTSIDE: outlines sit outside the box and are excluded from',
          'layout, so focusing a link cannot reflow the menu around it.',
          '',
          'Every value here is a token — `text/button/s` over `color/ui/grey-80`,',
          '`color/primary/100` for the hover fill, `color/primary/700` for the ring,',
          '`radius/md` for both corners — and the Figma node binds the same ones. The',
          'design originally drew 10px padding over unbound text at a 21px line height;',
          'Figma was moved onto the scale rather than this file off it, so the two now',
          'describe the same box.',
          '',
          'Note this is not what `Nav` renders internally — `Nav` still styles its own',
          'links with a colour shift rather than this pill. The two are worth',
          'reconciling; flagged rather than changed, so nothing using `Nav` shifts',
          'underneath it.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof NavLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

// No Hover story: the pseudo-states addon is not installed, so a story claiming
// to force :hover would render identically to Default and quietly lie about it.
// Button.stories.tsx takes the same position for its hover, focus and pressed
// states — point at the link instead.

/** A full menu row, which is how the link is actually used. */
export const Menu: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <nav aria-label="Example" className="flex gap-small">
      <NavLink label="Work" href="#" />
      <NavLink label="About" href="#" />
      <NavLink label="Contact" href="#" />
    </nav>
  ),
}
