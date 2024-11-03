import type * as React from "react";

export interface IconProps extends React.SVGAttributes<SVGElement> {
  children?: never;
  color?: string;
}

export type IconComponent<ExtraProps extends Record<string, unknown>> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<IconProps> & ExtraProps & React.RefAttributes<SVGSVGElement>
> & {
  alias?: Array<string>;
};
