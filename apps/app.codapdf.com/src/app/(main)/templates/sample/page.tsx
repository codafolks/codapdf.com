import { TemplateBuilder } from "@/app/(main)/templates/_containers/TemplateBuilder";

type SamplePageProps = {
  searchParams: Promise<{
    id: string;
  }>;
};

const SamplePage = async (props: SamplePageProps) => {
  const searchParams = await props.searchParams;
  const { id } = searchParams;
  const sampleId = id;
  return <TemplateBuilder sourceId={{ sampleId }} />;
};

export default SamplePage;
