import type { ColorGroup } from '../components/ColorTable';
import type { TypeToken } from '../components/TypeTable';
import type { IconEntry } from '../components/IconTable';
import {
  ArrowLeft, ArrowRight, Chat, ChatCircle, Check, ChevronDown, ChevronUp,
  CircleInfo, CircleQuestion, CircleWarning, Close, Enter, Exit, Heart, Home,
  Mail, Search, Settings, Star, UserEmpty,
} from '../components/icons';

// Single source of truth for the reference tables. Both the App.tsx page and the
// Storybook foundations MDX pages read from here, so the two cannot drift.
//
// Every Tailwind class in this file is written out in full and never built by
// template interpolation: Tailwind scans source text, so `bg-${prefix}-${step}`
// would generate no CSS and the swatch would silently render transparent.

// The scale has two authorities, and they disagree. Which one wins is per-token:
//
//   - display/l follows FIGMA (node 1:241, style text/display/l): Roboto Serif
//     Bold 60 / 1.12 leading / -2% tracking = -1.2px. This is the only token
//     carrying tracking, and the only one with a numeric leading on a display
//     step. The site's h1 is Light 40 with no tracking — deliberately not used.
//   - every other step follows the live site (dig-video-94863958.figma.site):
//     display/s is font-body, not font-display, because the site's .h3 is Work
//     Sans Medium 22 — the serif stops at display/md. The token keeps its
//     `display` name because that is still its role in the hierarchy. Body copy
//     and buttons declare no tracking.
//   - display/md now carries Figma's -2% too: the mobile landing page h1
//     (my-website node 22:138) binds text/display/md, and that style tracks
//     -0.64px = -2% at 32. Nothing in code used display/md before, so the only
//     thing that changes is this table.
//
// Where a step is not given an explicit ratio, Figma AUTO line height maps to
// leading-[normal].
//
// The size, leading, tracking and weight of each step are TOKENS (--text-* in
// theme.css) and are not restated here — a step is `text-<name>` plus its family
// utility, because a font family is not part of a --text-* token. The families
// do not follow the names uniformly: display/s is font-body. body/md-link is
// body/md plus a text decoration, which no font-size token can carry, so it is
// the one step with an extra utility.
const SAMPLE = 'Build your own team library';

export const TYPE_STYLES: TypeToken[] = [
  { name: 'text/display/l', sample: SAMPLE, className: 'font-display text-display-l' },
  { name: 'text/display/md', sample: SAMPLE, className: 'font-display text-display-md' },
  { name: 'text/display/s', sample: SAMPLE, className: 'font-body text-display-s' },
  { name: 'text/display/xs', sample: SAMPLE, className: 'font-display text-display-xs' },
  { name: 'text/body/lg', sample: SAMPLE, className: 'font-body text-body-lg' },
  { name: 'text/body/md', sample: SAMPLE, className: 'font-body text-body-md' },
  { name: 'text/body/md-em', sample: SAMPLE, className: 'font-body text-body-md-em' },
  { name: 'text/body/md-link', sample: SAMPLE, className: 'font-body text-body-md underline' },
  { name: 'text/body/s', sample: SAMPLE, className: 'font-body text-body-s' },
  { name: 'text/button/lg', sample: SAMPLE, className: 'font-body text-button-lg' },
  { name: 'text/button/s', sample: SAMPLE, className: 'font-body text-button-s' },
];

export const COLOR_GROUPS: ColorGroup[] = [
  {
    title: 'Primary — purple ramp',
    tokens: [
      { name: 'primary-100', swatchClass: 'bg-primary-100' },
      { name: 'primary-200', swatchClass: 'bg-primary-200' },
      { name: 'primary-300', swatchClass: 'bg-primary-300' },
      { name: 'primary-400', swatchClass: 'bg-primary-400' },
      { name: 'primary-500', swatchClass: 'bg-primary-500' },
      { name: 'primary-600', swatchClass: 'bg-primary-600', note: 'default' },
      { name: 'primary-700', swatchClass: 'bg-primary-700' },
      { name: 'primary-800', swatchClass: 'bg-primary-800' },
      { name: 'primary-900', swatchClass: 'bg-primary-900' },
      { name: 'primary', swatchClass: 'bg-primary', note: '→ primary-600' },
    ],
  },
  {
    title: 'Secondary — mint ramp',
    tokens: [
      { name: 'secondary-100', swatchClass: 'bg-secondary-100' },
      { name: 'secondary-200', swatchClass: 'bg-secondary-200' },
      { name: 'secondary-300', swatchClass: 'bg-secondary-300', note: 'default' },
      { name: 'secondary-400', swatchClass: 'bg-secondary-400' },
      { name: 'secondary-500', swatchClass: 'bg-secondary-500' },
      { name: 'secondary-600', swatchClass: 'bg-secondary-600', note: 'no legible text' },
      { name: 'secondary-700', swatchClass: 'bg-secondary-700' },
      { name: 'secondary-800', swatchClass: 'bg-secondary-800' },
      { name: 'secondary-900', swatchClass: 'bg-secondary-900' },
      { name: 'secondary', swatchClass: 'bg-secondary', note: '→ secondary-300' },
    ],
  },
  {
    title: 'Surfaces & borders',
    tokens: [
      { name: 'surface', swatchClass: 'bg-surface' },
      { name: 'border', swatchClass: 'bg-border' },
      { name: 'border-dark', swatchClass: 'bg-border-dark' },
    ],
  },
  {
    title: 'Text',
    tokens: [
      { name: 'body', swatchClass: 'bg-body' },
      { name: 'body-disabled', swatchClass: 'bg-body-disabled' },
    ],
  },
  {
    title: 'UI neutrals',
    tokens: [
      { name: 'white', swatchClass: 'bg-white' },
      { name: 'grey-20', swatchClass: 'bg-grey-20' },
      { name: 'grey-40', swatchClass: 'bg-grey-40' },
      { name: 'grey-80', swatchClass: 'bg-grey-80' },
      { name: 'grey-100', swatchClass: 'bg-grey-100' },
      { name: 'black', swatchClass: 'bg-black' },
    ],
  },
  {
    title: 'Status',
    tokens: [
      { name: 'error', swatchClass: 'bg-error' },
      { name: 'error-dark', swatchClass: 'bg-error-dark' },
    ],
  },
];

// figmaName is the source name in the ICONS frame (node 185:17). It differs from
// the code name where Figma carries a design-time size suffix (-L) or a variant
// index (Settings-6).
export const ICONS: IconEntry[] = [
  { name: 'ArrowLeft', figmaName: 'Arrow / Arrow-Left-L', Icon: ArrowLeft },
  { name: 'ArrowRight', figmaName: 'Arrow / Arrow-Right-L', Icon: ArrowRight },
  { name: 'Chat', figmaName: 'Communication / Chat', Icon: Chat },
  { name: 'ChatCircle', figmaName: 'Communication / Chat-Circle', Icon: ChatCircle },
  { name: 'Check', figmaName: 'Basic / Check', Icon: Check },
  { name: 'ChevronDown', figmaName: 'Arrow / Chevron-Down-L', Icon: ChevronDown },
  { name: 'ChevronUp', figmaName: 'Arrow / Chevron-Up-L', Icon: ChevronUp },
  { name: 'CircleInfo', figmaName: 'Warning / Circle-Info', Icon: CircleInfo },
  { name: 'CircleQuestion', figmaName: 'Warning / Circle-Question', Icon: CircleQuestion },
  { name: 'CircleWarning', figmaName: 'Warning / Circle-Warning', Icon: CircleWarning },
  { name: 'Close', figmaName: 'Basic / Close-L', Icon: Close },
  { name: 'Enter', figmaName: 'Basic / Enter', Icon: Enter },
  { name: 'Exit', figmaName: 'Basic / Exit', Icon: Exit },
  { name: 'Heart', figmaName: 'Basic / Heart', Icon: Heart },
  { name: 'Home', figmaName: 'Basic / Home', Icon: Home },
  { name: 'Mail', figmaName: 'Communication / Mail', Icon: Mail },
  { name: 'Search', figmaName: 'Basic / Search', Icon: Search },
  { name: 'Settings', figmaName: 'Basic / Settings-6', Icon: Settings },
  { name: 'Star', figmaName: 'Basic / Star', Icon: Star },
  { name: 'UserEmpty', figmaName: 'User / User-Empty', Icon: UserEmpty },
];

export interface ScaleToken {
  /** Token name without its CSS-variable prefix, e.g. "sm" or "medium". */
  name: string;
  /** The utility class a consumer actually writes. */
  utility: string;
  /** Resolved value, for the reference column. */
  value: string;
  /** Literal Tailwind classes applied to the visual sample. */
  sampleClass: string;
  /** Optional annotation. */
  note?: string;
}

// Mirrors Figma's `radius` variable collection, which every radius in the Figma
// components is bound to.
export const RADIUS_SCALE: ScaleToken[] = [
  { name: 'radius-sm', utility: 'rounded-sm', value: '4px', sampleClass: 'rounded-sm', note: 'Checkbox box' },
  { name: 'radius-md', utility: 'rounded-md', value: '8px', sampleClass: 'rounded-md', note: 'Input / Text area' },
  { name: 'radius-lg', utility: 'rounded-lg', value: '12px', sampleClass: 'rounded-lg', note: 'Card' },
  { name: 'radius-full', utility: 'rounded-full', value: '40px', sampleClass: 'rounded-full', note: 'Button pill; clamps to a circle on small boxes' },
];

// Figma Spacing/XS · S · M · L. There is deliberately no 24px token, which is why
// the large Button keeps Tailwind's numeric px-6 for its inline padding.
export const SPACING_SCALE: ScaleToken[] = [
  { name: 'spacing-small', utility: 'p-small / gap-small', value: '8px', sampleClass: 'w-small' },
  { name: 'spacing-medium', utility: 'p-medium / gap-medium', value: '16px', sampleClass: 'w-medium' },
  { name: 'spacing-large', utility: 'p-large / gap-large', value: '32px', sampleClass: 'w-large' },
  { name: 'spacing-extra-large', utility: 'p-extra-large', value: '48px', sampleClass: 'w-extra-large' },
];
