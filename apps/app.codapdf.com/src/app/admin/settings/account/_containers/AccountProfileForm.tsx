"use client";

import { useAccountProfileFormController } from "@/app/admin/settings/account/_controllers/useAccountProfileFormController";
import { ContentBox } from "@/components/app/ContentBox";
import { InputController } from "@/components/app/forms";
import { Button } from "@/components/ui/button";

export const AccountProfileForm = () => {
  const { form, onSubmit, isSubmitting } = useAccountProfileFormController();
  return (
    <ContentBox title="Basic">
      <p>Manage your personal account details.</p>
      <form className="grid grid-cols-2 gap-4 pt-2" onSubmit={onSubmit}>
        <InputController
          label="Name"
          control={form.control}
          name="name"
          placeholder="Jon Smith"
          className="col-span-2"
        />
        <InputController
          label="Email"
          control={form.control}
          name="email"
          placeholder="hello@codapdf.com"
          className="col-span-2"
          disabled
        />
        <div className="col-span-2 flex items-end justify-end">
          <Button type="submit" submitting={isSubmitting} variant="secondary">
            Save
          </Button>
        </div>
      </form>
    </ContentBox>
  );
};
