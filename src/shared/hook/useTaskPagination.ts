import { useTaskPaginated } from "./useReactQuery.ts";
import { TaskUrlParams } from "./useTaskUrlParams.ts";
export interface PaginationMetadata {
  currentPage: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const useTaskPagination = (params: TaskUrlParams) => {
  const { page, perPage, status, priority } = params;
  const filters = {
    ...(status !== "ALL" && { status }),
    ...(priority !== "ALL" && { priority }),
  };

  const { data, isLoading, isError } = useTaskPaginated(
    page,
    perPage,
    Object.keys(filters).length > 0 ? filters : undefined
  );

  const tasks = data?.tasks ?? [];
  const totalItems = data?.total ?? 0;

  const totalPages = perPage > 0 ? Math.ceil(totalItems / perPage) : 0;
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  const metadata: PaginationMetadata = {
    currentPage: page,
    perPage,
    totalPages,
    totalItems,
    hasNextPage,
    hasPreviousPage,
  };

  return {
    tasks,
    metadata,
    isLoading,
    isError,
  };
};
