"use client";
import { useAccountUpdatePasswordFormController } from "@/app/(main)/settings/account/_controllers/useAccountUpdatePasswordFormController";
import { ContentBox } from "@/components/app/ContentBox";
import { InputController } from "@/components/app/forms";
import { Button } from "@/components/ui/button";

export const AccountUpdatePasswordForm = () => {
  const { form, onSubmit, hasPassword } = useAccountUpdatePasswordFormController();
  return (
    <ContentBox title="Update Password">
      <form className="grid grid-cols-2 gap-4 pt-2" onSubmit={onSubmit}>
        {hasPassword && <InputController label="Current Password" control={form.control} name="currentPassword" type="password" className="col-span-2" />}
        <InputController label="New Password" control={form.control} name="password" type="password" className="col-span-2" />
        <InputController label="Confirm New Password" control={form.control} name="confirmPassword" type="password" className="col-span-2" />
        <div className="col-span-2 flex items-end justify-end">
          <Button type="submit" submitting={form.formState.isSubmitting} variant="secondary">
            Save
          </Button>
        </div>
      </form>
    </ContentBox>
  );
};
