import type { ScaleToken } from './tokens';

interface ScaleTableProps {
  tokens: ScaleToken[];
  /** 'radius' draws a rounded box per step; 'spacing' draws a bar of that width. */
  kind: 'radius' | 'spacing';
}

const COLUMNS = ['Sample', 'Token', 'Utility', 'Value', ''];

// A docs helper, not part of the component library — it exists so the Radius and
// Spacing MDX pages render real tokens rather than pictures of them.
export function ScaleTable({ tokens, kind }: ScaleTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border-dark">
            {COLUMNS.map((col, i) => (
              <th
                key={col || `col-${i}`}
                className="py-2xs pr-s text-left font-body text-xs text-body-disabled"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token.name} className="border-b border-border">
              <td className="py-2xs pr-s">
                {kind === 'radius' ? (
                  <span
                    className={`block size-l border-2 border-primary-500 bg-primary-100 ${token.sampleClass}`}
                  />
                ) : (
                  <span className={`block h-l bg-primary-500 ${token.sampleClass}`} />
                )}
              </td>
              <td className="py-2xs pr-s whitespace-nowrap font-body text-sm text-body">
                {token.name}
              </td>
              <td className="py-2xs pr-s whitespace-nowrap font-body text-sm text-body-disabled">
                {token.utility}
              </td>
              <td className="py-2xs pr-s whitespace-nowrap font-body text-sm text-body">
                {token.value}
              </td>
              <td className="py-2xs font-body text-sm text-body-disabled">{token.note ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
