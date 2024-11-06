import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormProps, useForm } from "react-hook-form";
import type { z } from "zod";

// biome-ignore lint/suspicious/noExplicitAny: This is a type definition
type UseZodFormProps<TSchema extends z.ZodType<any, any>, TContext> = Pick<UseFormProps<TSchema["_input"], TContext>, "defaultValues" | "values" | "context"> & {
  schema: TSchema;
  mode?: "onSubmit" | "onBlur" | "onChange" | "onTouched" | "all";
  schemaTransform?: (schema: TSchema, values: TSchema["_input"], context: TContext | undefined) => Promise<z.ZodType<z.output<typeof schema>>> | z.ZodType<z.output<typeof schema>>;
};
// biome-ignore lint/suspicious/noExplicitAny: This is a type definition
export const useZodForm = <TSchema extends z.ZodType<any, any>, TContext = any>({ schema, schemaTransform, mode = "onChange", ...props }: UseZodFormProps<TSchema, TContext>) =>
  useForm<TSchema["_output"], TContext, TSchema["_output"]>({
    mode,
    resolver: schemaTransform ? async (data, context, options) => zodResolver(await schemaTransform(schema, data, context))(data, context, options) : zodResolver(schema),
    delayError: 500,
    ...props,
  });
