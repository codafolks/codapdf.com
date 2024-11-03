import { useToast } from "@/components/ui/use-toast";
import { updateAccountPassword } from "@/server/actions/auth/updateAccountPassword";
import { accountUpdatePasswordZodSchema } from "@/server/schemas/accountUpdatePasswordZodSchema";
import { useZodForm } from "@/client/utils/useZodForm";

export const useAccountUpdatePasswordFormController = () => {
  const { toast } = useToast();
  const form = useZodForm({
    schema: accountUpdatePasswordZodSchema,
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await updateAccountPassword(data);
      toast({
        title: "Password updated",
        description: "Your password has been successfully updated",
      });
    } catch (error) {
      const message = error instanceof Error && "message" in error ? error.message : "Something went wrong";
      toast({
        title: "Password update failed",
        description: message,
        variant: "destructive",
      });
    }
  });

  return { form, onSubmit };
};
