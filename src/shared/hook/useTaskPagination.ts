import { useQueryParams } from "./useQueryParams.ts";
import { useTaskPaginated } from "./useReactQuery.ts";

export const useTaskPagination = () => {
  const { getParams, updateParams, defaultPage, defaultPerPage } =
    useQueryParams();
  const { page, perPage, status, priority } = getParams();

  const { data, isLoading, isError } = useTaskPaginated(page, perPage, {
    status: status !== "ALL" ? status : undefined,
    priority: priority !== "ALL" ? priority : undefined,
  });

  const totalPages = Math.ceil((data?.total || 0) / perPage);

  const handlePageChange = (newPage: number) => {
    updateParams({ page: String(Math.max(1, Math.min(newPage, totalPages))) });
  };

  const handlePerPageChange = (newPerPage: number) => {
    updateParams({
      perPage: String(newPerPage),
      page: defaultPage,
    });
  };

  return {
    currentPage: page,
    perPage,
    totalPages,
    tasks: data?.tasks || [],
    isLoading,
    isError,
    handlePageChange,
    handlePerPageChange,
  };
};
