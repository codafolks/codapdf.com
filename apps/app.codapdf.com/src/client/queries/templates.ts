import { type TemplateSourceId, getTemplateSourceId } from "@/app/admin/templates/_utils/getTemplateSourceId";
import { type ReactQueryOptions, type RouterInputs, trpcClient } from "@/server/trpc/trpcClient";

type TemplateSampleByIdQueryOptions = ReactQueryOptions["templates"]["getSampleById"];
type TemplateSampleByIdInput = RouterInputs["templates"]["getSampleById"];

export const useTemplateSave = trpcClient.templates.save.useMutation;
export const useTemplateById = (sourceId: TemplateSourceId) => {
  const { templateId, sampleId } = getTemplateSourceId(sourceId);

  const templateById = trpcClient.templates.getById.useQuery({ id: templateId ?? -1 }, { enabled: !!templateId });
  const templateSampleById = trpcClient.templates.getSampleById.useQuery(
    { id: sampleId ?? "" },
    { enabled: !!sampleId },
  );
  const template = templateId ? templateById : templateSampleById;
  return {
    ...template,
    isSample: !!sampleId,
    data: template.data?.data,
  };
};

export const useTemplateSampleById = (input: TemplateSampleByIdInput, options?: TemplateSampleByIdQueryOptions) => {
  const { data, ...rest } = trpcClient.templates.getSampleById.useQuery(input, options);
  return {
    data: data?.data,
    ...rest,
  };
};

export const useTemplateList = trpcClient.templates.list.useQuery;
export const useTemplateConvertHtml2PDF = trpcClient.templates.convertHtml2PDF.useMutation;
export const useTemplateDelete = trpcClient.templates.delete.useMutation;
