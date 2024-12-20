import { Input, type InputProps } from "@/components/ui/input";
import { forwardRef } from "react";

import { NumericFormat } from "react-number-format";
import type { NumericFormatProps } from "react-number-format/types/types";

export type NumericInputProps = NumericFormatProps<InputProps>;
const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (props, _) => {
    return <NumericFormat {...props} customInput={Input} />;
  },
);
NumericInput.displayName = "NumericInput";
export { NumericInput };
