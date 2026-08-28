import { useEffect, useRef, useState } from 'react';

export interface ColorToken {
  /** Token name without the --color- prefix, e.g. "primary-600". */
  name: string;
  /** Tailwind background utility referencing that token. Must be a literal
   *  string — Tailwind's scanner cannot see interpolated class names. */
  swatchClass: string;
  /** Optional annotation, e.g. "alias → primary-600". */
  note?: string;
}

export interface ColorGroup {
  title: string;
  tokens: ColorToken[];
}

interface ColorTableProps {
  groups: ColorGroup[];
}

// Hex values are read from each swatch's *computed* background-color instead of
// being hardcoded. That keeps the table honest — it always reports what the
// token actually resolves to, including through aliases like --color-primary —
// and it keeps hex values out of the source, per CLAUDE.md.
function toHex(computed: string): string {
  const parts = computed.match(/[\d.]+/g);
  if (!parts || parts.length < 3) return computed;
  const [r, g, b] = parts.slice(0, 3).map((n) => Math.round(parseFloat(n)));
  const hex =
    '#' +
    [r, g, b]
      .map((v) => v.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase();
  const alpha = parts.length > 3 ? parseFloat(parts[3]) : 1;
  return alpha < 1 ? `${hex} / ${Math.round(alpha * 100)}%` : hex;
}

export function ColorTable({ groups }: ColorTableProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hexes, setHexes] = useState<Record<string, string>>({});

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const next: Record<string, string> = {};
    root.querySelectorAll<HTMLElement>('[data-token]').forEach((el) => {
      const token = el.dataset.token;
      if (token) next[token] = toHex(getComputedStyle(el).backgroundColor);
    });
    setHexes(next);
  }, [groups]);

  return (
    <div ref={rootRef} className="flex flex-col gap-l">
      {groups.map((group) => (
        <table
          key={group.title}
          className="w-full max-w-md border-collapse font-body text-sm text-body"
        >
          <caption className="pb-2xs text-left font-display text-base text-body">
            {group.title}
          </caption>
          <tbody>
            {group.tokens.map((token) => (
              <tr key={token.name} className="border-b border-border">
                <td className="w-l py-2xs">
                  <span
                    data-token={token.name}
                    className={`${token.swatchClass} block size-l rounded-md border border-border-dark`}
                  />
                </td>
                <td className="py-2xs pl-s">
                  {token.name}
                  {token.note && (
                    <span className="pl-2xs text-body-disabled">{token.note}</span>
                  )}
                </td>
                <td className="py-2xs pl-s text-right tabular-nums text-body-disabled">
                  {hexes[token.name] ?? '…'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}
