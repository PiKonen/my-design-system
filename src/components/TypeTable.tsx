export interface TypeToken {
  /** Figma text style name, e.g. "text/display/l". */
  name: string;
  /** Literal Tailwind classes reproducing that style. Must be written out in
   *  full — Tailwind scans source text and cannot see interpolated names. */
  className: string;
  /** Short sample sentence rendered in the style. */
  sample: string;
}

interface TypeTableProps {
  tokens: TypeToken[];
}

// Samples all render in text-body so the comparison is purely typographic —
// colour is a separate token axis.
export function TypeTable({ tokens }: TypeTableProps) {
  return (
    <table className="w-full border-collapse">
      <tbody>
        {tokens.map((token) => (
          <tr key={token.name} className="border-b border-border">
            <td className="py-medium pr-medium align-baseline">
              <span className={`${token.className} text-body`}>{token.sample}</span>
            </td>
            <td className="py-medium whitespace-nowrap text-right align-baseline font-body text-sm text-body-disabled">
              {token.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
