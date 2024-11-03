import type * as React from "react";

export interface IconProps extends React.SVGAttributes<SVGElement> {
  children?: never;
  color?: string;
}

// biome-ignore lint/complexity/noBannedTypes: doch!
export type IconComponent<ExtraProps extends {} = {}> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<IconProps> & ExtraProps & React.RefAttributes<SVGSVGElement>
> & {
  alias?: Array<string>;
};
