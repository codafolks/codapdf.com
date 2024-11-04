import { useUser, useUserUpdate } from "@/client/queries/users";
import { useZodForm } from "@/client/utils/useZodForm";
import { useToast } from "@/components/ui/use-toast";
import { userZodSchema } from "@/server/database/schemas/users";
import { useEffect } from "react";

type UseUserProfileController = {
  onSuccess?: () => void;
  onError?: () => void;
};
export const useAccountProfileFormController = (options?: UseUserProfileController) => {
  const { toast } = useToast();
  const { data: user, isLoading } = useUser();
  const update = useUserUpdate({
    onSuccess: () => {
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
      options?.onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "Profile update failed",
        description: error.message,
        variant: "destructive",
      });
      options?.onError?.();
    },
  });

  const form = useZodForm({
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
    schema: userZodSchema,
  });

  useEffect(() => {
    if (!isLoading) {
      form.reset({
        name: user?.name ?? "",
        email: user?.email ?? "",
      });
    }
  }, [isLoading, user, form.reset]);

  const onSubmit = form.handleSubmit(async (data) => {
    await update.mutateAsync(data);
  });
  return { form, onSubmit, isSubmitting: update.isPending };
};
