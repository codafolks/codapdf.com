import { ApiKeysList } from "@/app/admin/api-keys/_containers/ApiKeysList";
const ApiKeysPage = () => {
  return (
    <div className="grid gap-4 p-4">
      <ApiKeysList />
    </div>
  );
};
export default ApiKeysPage;