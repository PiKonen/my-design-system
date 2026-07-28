import type { ComponentType } from 'react';
import type { IconProps } from './icons';

export interface IconEntry {
  /** Code component name. */
  name: string;
  /** Source name in Figma, kept for traceability. */
  figmaName: string;
  Icon: ComponentType<IconProps>;
}

interface IconTableProps {
  icons: IconEntry[];
}

const COLUMNS = ['Icon', 'Name', 'Figma name', 'Sizes', 'Colour'];

// Columns exercise both of the icon API's props: `size` and colour-via-className.
export function IconTable({ icons }: IconTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border-dark">
            {COLUMNS.map((col) => (
              <th
                key={col}
                className="py-small pr-medium text-left font-body text-xs text-body-disabled"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {icons.map(({ name, figmaName, Icon }) => (
            <tr key={name} className="border-b border-border">
              <td className="py-small pr-medium">
                <Icon />
              </td>
              <td className="py-small pr-medium whitespace-nowrap font-body text-sm text-body">
                {name}
              </td>
              <td className="py-small pr-medium whitespace-nowrap font-body text-sm text-body-disabled">
                {figmaName}
              </td>
              <td className="py-small pr-medium">
                <span className="flex items-center gap-small">
                  <Icon size={16} />
                  <Icon size={24} />
                  <Icon size={32} />
                </span>
              </td>
              <td className="py-small">
                <span className="flex items-center gap-small">
                  <Icon className="text-primary" />
                  <Icon className="text-secondary-500" />
                  <Icon className="text-error" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
