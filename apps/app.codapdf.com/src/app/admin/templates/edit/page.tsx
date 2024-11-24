import { TemplateBuilder } from "@/app/admin/templates/_containers/TemplateBuilder";

type TemplateEditPageProps = {
  searchParams: Promise<{ id: number }>;
};
const TemplateEditPage = async (props: TemplateEditPageProps) => {
  const searchParams = await props.searchParams;

  const { id } = searchParams;

  const templateId = id;
  return (
    <TemplateBuilder
      sourceId={{
        templateId,
      }}
    />
  );
};
export default TemplateEditPage;
