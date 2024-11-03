import type { ApiResponse } from "@/server/types/apiResponse";

export type PaginatedResult<T> = {
  results: Array<T>;
  total: number;
  totalPages: number;
  currentPage: number;
  message?: string;
};

export const buildPaginatedResult = <T>({ message, ...data }: PaginatedResult<T>): ApiResponse<PaginatedResult<T>> => ({
  data,
  message,
});
