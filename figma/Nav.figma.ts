// url=https://www.figma.com/design/BPK4nPzVTPPb8wOYUZnD71/Design-system-PI?node-id=345-18
// source=src/components/Nav.tsx
// component=Nav
import figma from 'figma'

// The Figma node is named "Navigation" but maps to `Nav`, which is the exported
// name in the codebase — the node was rebuilt onto the existing component rather
// than shipped as a second one alongside it.
//
// Nothing is read off the instance. The node defines no component properties:
// its site name is a plain text layer and its links are three separate NavLink
// instances, so there is no `links` array in Figma to map an array prop onto.
// The example below therefore stands in for the shape, with the strings matching
// the label.* keys in the consuming site's content.JSON — which is where the
// real copy comes from. Nav takes it as props rather than fetching it, so the
// library carries no dependency on a path that only exists on one site.
export default {
  example: figma.code`
    <Nav
      siteName={content["label.SiteName"]}
      links={[
        { label: content["label.Navi_1"], href: "/work" },
        { label: content["label.Navi_2"], href: "/about" },
        { label: content["label.Navi_3"], href: "/contact" },
      ]}
    />
  `,
  imports: ['import { Nav } from "pinx-ui"'],
  id: 'nav',
  metadata: { nestable: false },
}
