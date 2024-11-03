import { AccountProfileForm } from "@/app/admin/settings/account/_containers/AccountProfileForm";
import { AccountUpdatePasswordForm } from "@/app/admin/settings/account/_containers/AccountUpdatePasswordForm";

const AccountSettingsPage = () => (
  <div className="flex flex-col gap-4 p-4">
    <AccountProfileForm />
    <AccountUpdatePasswordForm />
  </div>
);
export default AccountSettingsPage;
