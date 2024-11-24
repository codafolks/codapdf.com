import { useUser } from "@/client/queries/users";
import { useZodForm } from "@/client/utils/useZodForm";
import { useToast } from "@/components/ui/use-toast";
import { updateAccountPassword } from "@/server/actions/auth/updateAccountPassword";
import {
  type AccountSetPasswordInput,
  type AccountUpdatePasswordInput,
  accountSetPasswordZodSchema,
  accountUpdatePasswordZodSchema,
} from "@/server/schemas/accountUpdatePasswordZodSchema";

export const useAccountUpdatePasswordFormController = () => {
  const { data: user } = useUser();
  const { toast } = useToast();
  const form = useZodForm({
    schema: user?.hasPassword ? accountUpdatePasswordZodSchema : accountSetPasswordZodSchema,
  });

  const onSubmit = form.handleSubmit(async (data: AccountSetPasswordInput | AccountUpdatePasswordInput) => {
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

  return { form, onSubmit, hasPassword: user?.hasPassword };
};
