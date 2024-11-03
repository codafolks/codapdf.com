import { protectedProcedure } from "@/server/trpc/procedures/protectedProcedure";
import { convertHtmlToPDF } from "@/server/actions/templates/convertHtmlToPDF";
import {
  templateOnFetchZodSchema,
  templateOnSaveZodSchema,
  templateOnSelectZodSchema,
} from "@/server/database/schemas/templates";
import { z } from "zod";
import { saveTemplate } from "@/server/actions/templates/saveTemplate";
import { deleteTemplate } from "@/server/actions/templates/deleteTemplate";
import { listTemplates } from "@/server/actions/templates/listTemplates";
import { getTemplateById } from "@/server/actions/templates/getTemplateById";
import { templateExamples } from "@/app/(main)/templates/_data/templates";

export const templateRouter = {
  getSampleById: protectedProcedure
    .output(
      z.object({
        data: z
          .object({
            id: z.string(),
            name: z.string(),
            description: z.string(),
            files: z.array(
              z.object({
                filename: z.string(),
                content: z.string(),
              }),
            ),
          })
          .nullable(),
        message: z.string(),
      }),
    )
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const sampleId = input.id;
      const data = templateExamples.find((t) => t.id === sampleId);
      return {
        data: data || null,
        message: data ? "Template found" : "Template not found",
      };
    }),
  getById: protectedProcedure
    .input(
      z.object({
        id: z.coerce.number(),
      }),
    )
    .output(
      z.object({
        data: templateOnFetchZodSchema,
        message: z.string(),
      }),
    )
    .query(async ({ input }) => getTemplateById(input.id)),
  save: protectedProcedure
    .output(
      z.object({
        data: templateOnSelectZodSchema,
        message: z.string(),
      }),
    )
    .input(templateOnSaveZodSchema)
    .mutation(async ({ input }) => saveTemplate(input)),
  delete: protectedProcedure
    .output(z.object({ data: z.string().nullable(), message: z.string() }))
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => deleteTemplate(input.id)),
  list: protectedProcedure
    .output(
      z.object({
        data: z.array(templateOnFetchZodSchema.omit({ files: true })),
        message: z.string(),
      }),
    )
    .query(listTemplates),
  convertHtml2PDF: protectedProcedure
    .input(z.object({ html: z.string(), data: z.any() }))
    .output(
      z.object({
        file_url: z.string().url(),
      }),
    )
    .mutation(async ({ input }) => {
      return await convertHtmlToPDF(input);
    }),
};
