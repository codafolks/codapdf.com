import { useZodForm } from "@/client/utils/useZodForm";
import { InputController } from "@/components/app/forms";
import { z } from "zod";

type FileNameFormProps = {
  filename?: string;
  files: Array<string>;
  onSubmit: (data: { filename: string }) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};
const fileZodSchema = z.object({
  //  must be a string with one of these extension: .css, .js or .json
  filename: z
    .string({ required_error: "File must be a valid css or js file" })
    .refine((val) => /\.(css|js|json)$/.test(val), {
      message: "File must be a valid css, js or json file",
    })
    .transform((val) => val.trim()),
});

export const FileNameForm = ({ filename, onSubmit, onKeyUp, files, onBlur }: FileNameFormProps) => {
  const form = useZodForm({
    mode: "onSubmit",
    schema: fileZodSchema,
    defaultValues: {
      filename,
    },
  });

  const handleOnSubmit = form.handleSubmit((data) => {
    if (files.includes(data.filename)) {
      form.setError("filename", {
        type: "manual",
        message: "File already exists",
      });
      return;
    }
    if (data.filename) {
      onSubmit({ filename: data.filename });
      form.reset();
    }
  });

  return (
    <form onSubmit={handleOnSubmit} className="flex flex-1">
      <InputController
        control={form.control}
        name="filename"
        placeholder="file.html"
        inputClassName="h-8 text-sm rounded-none"
        onKeyUp={onKeyUp}
        onBlur={onBlur}
        autoFocus
        className="flex-1"
      />
    </form>
  );
};
