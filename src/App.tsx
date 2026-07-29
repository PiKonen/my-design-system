import { useState } from 'react';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { Checkbox } from './components/Checkbox';
import { ColorTable } from './components/ColorTable';
import { IconTable } from './components/IconTable';
import { Input } from './components/Input';
import { Label } from './components/Label';
import { Nav } from './components/Nav';
import { Radio } from './components/Radio';
import { TypeTable } from './components/TypeTable';
import heroImage from './assets/hero.png';

// Token data moved to src/foundations/tokens.ts so this page and the Storybook
// foundations pages render from one source and cannot drift apart.
import { COLOR_GROUPS, ICONS, TYPE_STYLES } from './foundations/tokens';

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