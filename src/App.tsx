import { useState } from 'react';
import { Button } from './components/Button';
import { Checkbox } from './components/Checkbox';
import { Radio } from './components/Radio';
import { ColorTable, type ColorGroup } from './components/ColorTable';
import { TypeTable, type TypeToken } from './components/TypeTable';

// Mirrors the Figma text styles one-for-one. Figma AUTO line height maps to
// leading-[normal]; Figma's -2% tracking is size-dependent, hence the explicit
// px values (-2% of 40 = -0.8px, of 32 = -0.64px, of 22 = -0.44px, of 16 = -0.32px).
const SAMPLE = 'Build your own team library';
const TYPE_STYLES: TypeToken[] = [
  { name: 'text/display/l', sample: SAMPLE, className: 'font-display font-light text-[40px] leading-[normal] tracking-[-0.8px]' },
  { name: 'text/display/md', sample: SAMPLE, className: 'font-display font-medium text-[32px] leading-[normal] tracking-[-0.64px]' },
  { name: 'text/display/s', sample: SAMPLE, className: 'font-display font-medium text-[22px] leading-[normal] tracking-[-0.44px]' },
  { name: 'text/display/xs', sample: SAMPLE, className: 'font-display font-semibold text-base leading-[normal] tracking-[-0.32px]' },
  { name: 'text/body/lg', sample: SAMPLE, className: 'font-body font-normal text-xl leading-[1.25]' },
  { name: 'text/body/md', sample: SAMPLE, className: 'font-body font-normal text-base leading-[1.25]' },
  { name: 'text/body/md-em', sample: SAMPLE, className: 'font-body font-semibold text-base leading-[1.25]' },
  { name: 'text/body/md-link', sample: SAMPLE, className: 'font-body font-normal text-base leading-[1.25] underline' },
  { name: 'text/body/s', sample: SAMPLE, className: 'font-body font-normal text-sm leading-[1.25]' },
  { name: 'text/button/lg', sample: SAMPLE, className: 'font-body font-semibold text-base leading-[normal] tracking-[-0.32px]' },
];

// Every swatchClass is written out in full: Tailwind scans source text, so a
// template-built name like `bg-${prefix}-${step}` would generate no CSS and the
// swatch would silently render transparent.
const COLOR_GROUPS: ColorGroup[] = [
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
import {Label} from './components/Label';
import { Card } from './components/Card';
import heroImage from './assets/hero.png';
import { IconTable, type IconEntry } from './components/IconTable';
import {
  ArrowLeft, ArrowRight, Chat, ChatCircle, Check, ChevronDown, ChevronUp,
  CircleInfo, CircleQuestion, CircleWarning, Close, Enter, Exit, Heart, Home,
  Mail, Search, Settings, Star, UserEmpty,
} from './components/icons';

// figmaName is the source name in the ICONS frame (node 185:17). It differs from
// the code name where Figma carries a design-time size suffix (-L) or a variant
// index (Settings-6).
const ICONS: IconEntry[] = [
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
import { Nav } from './components/Nav';
import { Input } from './components/Input';

function App() {
  const [email, setEmail] = useState('');
  const [checked, setChecked] = useState(false);
  const [checkedError, setCheckedError] = useState(true);
  const [choice, setChoice] = useState('a');
  const [errorChoice, setErrorChoice] = useState('x');

  return (
    <div className="min-h-screen bg-surface">
      <Nav
        logo="My App"
        links={[
          { label: 'Home', href: '#' },
          { label: 'Docs', href: '#' },
          { label: 'About', href: '#' },
        ]}
      />

      <main className="max-w-5xl mx-auto p-8 flex flex-col gap-6">
        <section className="flex flex-col gap-medium">
          <h2 className="font-display text-xl text-body">Colors</h2>
          <p className="font-body text-sm text-body">
            Hex values are read from each swatch's computed style, so this table always
            reflects the live tokens in index.css.
          </p>
          <ColorTable groups={COLOR_GROUPS} />
        </section>

        <section className="flex flex-col gap-medium">
          <h2 className="font-display text-xl text-body">Typography</h2>
          <p className="font-body text-sm text-body">
            Each row reproduces one Figma text style. Samples render in text-body so the
            comparison is purely typographic.
          </p>
          <TypeTable tokens={TYPE_STYLES} />
        </section>

        <section className="flex flex-col gap-medium">
          <h2 className="font-display text-xl text-body">Icons</h2>
          <p className="font-body text-sm text-body">
            20 icons from Figma, 24px on a 1.5 stroke. Colour is currentColor, defaulting
            to grey-100 — pass any text-* class to recolour, or size to resize.
          </p>

          <IconTable icons={ICONS} />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-xl text-body">Button states</h2>
          <p className="font-body text-sm text-body">
            Default and Disabled render statically. Hover or keyboard-focus the enabled row to
            check the Hover and Focus states.
          </p>

          <div className="flex gap-4 items-center">
            <span className="w-20 font-body text-sm text-body">Enabled</span>
            <Button label="Button" variant="primary" onClick={() => {}} />
            <Button label="Button" variant="secondary" onClick={() => {}} />
          </div>

          <div className="flex gap-4 items-center">
            <span className="w-20 font-body text-sm text-body">Disabled</span>
            <Button label="Button" variant="primary" onClick={() => {}} disabled />
            <Button label="Button" variant="secondary" onClick={() => {}} disabled />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-xl text-body">Button sizes</h2>
          <p className="font-body text-sm text-body">
            Figma Size=Large / Size=Small. Small steps the padding down to 16/8 and the label to
            text/button/s (14px); the colour ramp and all five states are shared, so the two sizes
            cannot drift apart.
          </p>

          <div className="flex gap-4 items-center">
            <span className="w-28 font-body text-sm text-body">Large</span>
            <Button label="Button" variant="primary" onClick={() => {}} />
            <Button label="Button" variant="secondary" onClick={() => {}} />
          </div>

          <div className="flex gap-4 items-center">
            <span className="w-28 font-body text-sm text-body">Small</span>
            <Button label="Button" variant="primary" size="small" onClick={() => {}} />
            <Button label="Button" variant="secondary" size="small" onClick={() => {}} />
          </div>

          <div className="flex gap-4 items-center">
            <span className="w-28 font-body text-sm text-body">Small disabled</span>
            <Button label="Button" variant="primary" size="small" onClick={() => {}} disabled />
            <Button label="Button" variant="secondary" size="small" onClick={() => {}} disabled />
          </div>
        </section>

        <section className="flex flex-col gap-small">
          <h2 className="font-display text-xl text-body">Checkbox states</h2>
          <p className="font-body text-sm text-body">
            Hover and keyboard-focus the enabled boxes to check the remaining states.
          </p>

          <div className="flex flex-col gap-small">
            <Checkbox checked={checked} onChange={setChecked} label="Default / Selected (toggle me)" />
            <Checkbox checked={false} indeterminate onChange={() => {}} label="Indeterminate" />
            <Checkbox checked={checkedError} error onChange={setCheckedError} label="Error (toggle me)" />
            <Checkbox checked={false} disabled onChange={() => {}} label="Disabled" />
            <Checkbox checked disabled onChange={() => {}} label="Selected disabled" />
            <Checkbox checked={false} indeterminate disabled onChange={() => {}} label="Indeterminate disabled" />
          </div>
        </section>

        <section className="flex flex-col gap-small">
          <h2 className="font-display text-xl text-body">Radio states</h2>
          <p className="font-body text-sm text-body">
            Arrow keys move within a group. Hover and keyboard-focus to check the remaining states.
          </p>

          <div className="flex flex-col gap-small">
            <Radio name="demo" value="a" checked={choice === 'a'} onChange={setChoice} label="Default / Selected (pick me)" />
            <Radio name="demo" value="b" checked={choice === 'b'} onChange={setChoice} label="Second in the same group" />
            <Radio name="demo-error" value="x" checked={errorChoice === 'x'} onChange={setErrorChoice} error label="Error (selected)" />
            <Radio name="demo-error" value="y" checked={errorChoice === 'y'} onChange={setErrorChoice} error label="Error (unselected)" />
            <Radio name="demo-off" value="p" checked={false} onChange={() => {}} disabled label="Disabled" />
            <Radio name="demo-off2" value="q" checked onChange={() => {}} disabled label="Selected disabled" />
          </div>
        </section>

        <div className="w-full max-w-md p-4 bg-white rounded-lg border border-border flex flex-col gap-2">
          <Label label="Email address" />
          <Input
            value={email}
            onChange={setEmail}
            placeholder="name@example.com"
          />
        </div>

        <section className="flex flex-col gap-medium">
          <h2 className="font-display text-xl text-body">Card</h2>
          <p className="font-body text-sm text-body">
            Heading uses text/display/xs, body uses text/body/s. Hover the last one for the
            link shadow — the one state Figma doesn't model, since shadow-md has no token.
          </p>

          <div className="grid grid-cols-1 gap-medium sm:grid-cols-2 lg:grid-cols-3">
            <Card
              heading="Text only"
              body="The default form. This is what App.tsx rendered before, and what the Figma component shows with Show image off."
            />
            <Card
              heading="With image"
              body="The optional image prop renders above the content at a fixed 192px height, cropped to fill."
              image={heroImage}
            />
            <Card
              heading="As a link"
              body="Passing href renders an anchor instead of a div and adds a shadow on hover."
              image={heroImage}
              href="#"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;