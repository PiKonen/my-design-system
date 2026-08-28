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

// Figma is now the single authority for every step. It used to be split, and
// the two authorities disagreed: Figma won for display/l (node 1:241) and
// display/md, the live site (dig-video-94863958.figma.site) for everything
// else. That is why display/s was font-body — the site's .h3 was Work Sans
// Medium 22, so the serif stopped at display/md and the token kept its
// `display` name only for its role in the hierarchy.
//
// Figma's rework settles it. display/s is Roboto Serif Medium 22 now, which
// makes the family pairing uniform: display/* is font-display, body/* and
// button/* are font-body, with no exception to remember.
//
// Tracking is likewise no longer a display/l-only trait. Every display/* and
// button/* step carries Figma's -2%; the body/* steps carry none. That is new
// for display/s, display/xs, button/lg and button/s — all four of which this
// file used to document as declaring no tracking at all.
//
// Where a step is not given an explicit ratio, Figma AUTO line height maps to
// leading-[normal].
//
// The size, leading, tracking and weight of each step are TOKENS (--text-* in
// theme.css) and are not restated here — a step is `text-<name>` plus its family
// utility, because a font family is not part of a --text-* token. The families
// now follow the names exactly, so the family utility is mechanical.
// body/md-link is body/md plus a text decoration, which no font-size token can
// carry, so it remains the one step with an extra utility — Figma has promoted
// it to a real named style, but a style there still cannot hand over an
// underline here.
const SAMPLE = 'Build your own team library';

export const TYPE_STYLES: TypeToken[] = [
  { name: 'text/display/l', sample: SAMPLE, className: 'font-display text-display-l' },
  { name: 'text/display/md', sample: SAMPLE, className: 'font-display text-display-md' },
  { name: 'text/display/s', sample: SAMPLE, className: 'font-display text-display-s' },
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
// components is bound to. The four steps are unchanged, but Input moved down one
// — Figma binds it to radius/sm now, so it no longer sits on radius/md.
export const RADIUS_SCALE: ScaleToken[] = [
  { name: 'radius-sm', utility: 'rounded-sm', value: '4px', sampleClass: 'rounded-sm', note: 'Checkbox box, Input' },
  { name: 'radius-md', utility: 'rounded-md', value: '8px', sampleClass: 'rounded-md', note: 'Image Card, Navi link' },
  { name: 'radius-lg', utility: 'rounded-lg', value: '12px', sampleClass: 'rounded-lg', note: 'Card; the Radio circle in Figma' },
  { name: 'radius-full', utility: 'rounded-full', value: '40px', sampleClass: 'rounded-full', note: 'Button pill, Tag; clamps to a circle on small boxes' },
];

// Mirrors Figma's `Spacing` collection one-for-one: Spacing/4XS · 3XS · 2XS ·
// XS · S · M · L · XL. The 2px, 4px, 12px and 24px steps are new, and the names
// replaced the old small/medium/large/extra-large set.
// Read the renumbering carefully: `xs` is 12px, NOT the 8px that `small` held —
// 8px is `2xs`. Anything mapped across by name rather than by value shifts.
// Every component value now lands on a step. Two used to sit off the scale on
// Tailwind numerics for want of a token: the large Button's 24px inline padding
// and the Tag's 4px block padding.
export const SPACING_SCALE: ScaleToken[] = [
  { name: 'spacing-4xs', utility: 'p-4xs / gap-4xs', value: '2px', sampleClass: 'w-4xs', note: 'new — Checkbox + Radio inset' },
  { name: 'spacing-3xs', utility: 'p-3xs / gap-3xs', value: '4px', sampleClass: 'w-3xs', note: 'new — Tag block padding' },
  { name: 'spacing-2xs', utility: 'p-2xs / gap-2xs', value: '8px', sampleClass: 'w-2xs', note: 'was spacing-small' },
  { name: 'spacing-xs', utility: 'p-xs / gap-xs', value: '12px', sampleClass: 'w-xs', note: 'new — Input inset, Button large block' },
  { name: 'spacing-s', utility: 'p-s / gap-s', value: '16px', sampleClass: 'w-s', note: 'was spacing-medium' },
  { name: 'spacing-m', utility: 'p-m / gap-m', value: '24px', sampleClass: 'w-m', note: 'new — Card inset' },
  { name: 'spacing-l', utility: 'p-l / gap-l', value: '32px', sampleClass: 'w-l', note: 'was spacing-large' },
  { name: 'spacing-xl', utility: 'p-xl / gap-xl', value: '48px', sampleClass: 'w-xl', note: 'was spacing-extra-large' },
];
