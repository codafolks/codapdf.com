export type TemplateSourceId = { templateId: number } | { sampleId: string } | {} | undefined;
export const getTemplateSourceId = (sourceId: TemplateSourceId) => {
  if (!sourceId)
    return {
      templateId: undefined,
      sampleId: undefined,
      iframeSource: null,
    };

  const hasTemplateId = "templateId" in sourceId;
  const hasSampleId = "sampleId" in sourceId;
  const templateId = hasTemplateId ? sourceId.templateId : undefined;
  const sampleId = hasSampleId ? sourceId.sampleId : undefined;

  return { templateId, sampleId };
};
