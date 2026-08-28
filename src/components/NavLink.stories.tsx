import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavLink } from './NavLink'

const meta = {
  title: 'Components/NavLink',
  component: NavLink,
  args: {
    label: 'Work',
    href: '#',
    active: false,
  },
  argTypes: {
    label: { control: 'text' },
    href: { control: 'text' },
    active: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Figma: Design system PI › Navi link (node 345:33) — `Property 1` (Default ·',
          'hover · focus · Active), plus a Label text property.',
          '',
          'Hover and focus are CSS pseudo-states, so neither can be set from the controls',
          'panel — point at the link for the tinted pill, or Tab to it for the ring. The',
          'ring is an outline rather than a border, because Figma draws it as a 2px stroke',
          'at strokeAlign OUTSIDE: outlines sit outside the box and are excluded from',
          'layout, so focusing a link cannot reflow the menu around it.',
          '',
          '`active` is the one variant that is a prop, because it describes which page the',
          'visitor is on and no pseudo-class knows that. It is not the CSS `:active`',
          '(pressed); it is the current-page state, and it also sets `aria-current="page"`',
          'so the dark pill is not the only thing announcing it. Toggle it in the controls',
          'panel. Hovering an active link keeps the dark fill — the Figma set has no',
          'hover-while-active variant, and swapping to primary-100 would make the current',
          'page look like any other.',
          '',
          'Every value here is a token — `text/button/s` over `color/ui/grey-80`,',
          '`color/primary/100` for the hover fill, `color/primary/700` for the ring,',
          '`color/primary/800` and `color/ui/white` for the active pill, `radius/md` for',
          'every corner — and the Figma node binds the same ones. The design originally',
          'drew 10px padding over unbound text at a 21px line height; Figma was moved onto',
          'the scale rather than this file off it, so the two now describe the same box.',
          '',
          'Note `Nav` renders these links but has no way to mark one active yet: its',
          '`links` prop carries only `label` and `href`. Flagged rather than changed, so',
          'nothing using `Nav` shifts underneath it.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof NavLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** The current page: primary-800 pill, white label, `aria-current="page"`. */
export const Active: Story = {
  args: { active: true },
}

// No Hover story: the pseudo-states addon is not installed, so a story claiming
// to force :hover would render identically to Default and quietly lie about it.
// Button.stories.tsx takes the same position for its hover, focus and pressed
// states — point at the link instead. Active needs no such caveat; it is a prop.

/** A full menu row with one link marked current, which is how it is used. */
export const Menu: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <nav aria-label="Example" className="flex gap-2xs">
      <NavLink label="Work" href="#" active />
      <NavLink label="About" href="#" />
      <NavLink label="Contact" href="#" />
    </nav>
  ),
}
