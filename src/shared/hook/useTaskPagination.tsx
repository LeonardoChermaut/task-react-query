import { useTaskPaginated } from "@/shared/hook/useReactQuery.ts";
import { ITask, ITaskPaginatedResponse } from "@/shared/interface/interface.ts";
import { useState } from "react";

const pagination = {
  page: 1,
  perPage: 5,
} as const;

type UseTaskPaginationReturn = {
  tasks: ITask[];
  currentPage: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  setPage: (page: number) => void;
  changePerPage: (perPage: number) => void;
};

export const useTaskPagination = (): UseTaskPaginationReturn => {
  const [page, setPage] = useState<number>(pagination.page);
  const [perPage, setPerPage] = useState<number>(pagination.perPage);

  const { data, isLoading, isError } = useTaskPaginated(page, perPage);

  const tasksResponse: ITaskPaginatedResponse = data || {
    tasks: [],
    total: 0,
  };

  const totalItems = tasksResponse?.total || 0;
  const totalPages = Math.ceil(totalItems / perPage);

  const goToNextPage = () => setPage((p) => Math.min(p + 1, totalPages));

  const goToPrevPage = () => setPage((p) => Math.max(p - 1, 1));

  const goToPage = (p: number) =>
    setPage(() => Math.max(1, Math.min(p, totalPages)));

  const changePerPage = (newPerPage: number) => {
    setPerPage(newPerPage);
    setPage(pagination.page);
  };

  return {
    tasks: tasksResponse.tasks,
    currentPage: page,
    perPage,
    totalPages,
    totalItems: tasksResponse.total,
    isLoading,
    isError,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    goToNextPage,
    goToPrevPage,
    setPage: goToPage,
    changePerPage,
  };
};
