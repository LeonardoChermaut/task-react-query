import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { TaskPriority, TaskStatus } from "../interface/interface.ts";

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 5;

export interface TaskUrlParams {
  page: number;
  perPage: number;
  status: TaskStatus | "ALL";
  priority: TaskPriority | "ALL";
}

export const useTaskUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const getCurrentParams = useCallback((): TaskUrlParams => {
    const pageParam = searchParams.get("page");
    const perPageParam = searchParams.get("perPage");
    const statusParam = searchParams.get("status");
    const priorityParam = searchParams.get("priority");

    return {
      page: pageParam ? Math.max(1, parseInt(pageParam, 10)) : DEFAULT_PAGE,
      perPage: perPageParam ? Math.max(1, parseInt(perPageParam, 10)) : DEFAULT_PER_PAGE,
      status: (statusParam as TaskStatus) || "ALL",
      priority: (priorityParam as TaskPriority) || "ALL",
    };
  }, [searchParams]);

  const updateParams = useCallback(
    (updates: Partial<TaskUrlParams>, resetPage = false) => {
      const current = getCurrentParams();
      const newParams = new URLSearchParams();

      const finalParams = {
        ...current,
        ...updates,
        ...(resetPage && { page: DEFAULT_PAGE }),
      };


      if (finalParams.page !== DEFAULT_PAGE) {
        newParams.set("page", finalParams.page.toString());
      }

      if (finalParams.perPage !== DEFAULT_PER_PAGE) {
        newParams.set("perPage", finalParams.perPage.toString());
      }

      if (finalParams.status && finalParams.status !== "ALL") {
        newParams.set("status", finalParams.status);
      }

      if (finalParams.priority && finalParams.priority !== "ALL") {
        newParams.set("priority", finalParams.priority);
      }

      setSearchParams(newParams, { replace: true });
    },
    [getCurrentParams, setSearchParams]
  );

  const goToPage = useCallback(
    (page: number) => {
      updateParams({ page });
    },
    [updateParams]
  );

  const changePerPage = useCallback(
    (perPage: number) => {
      updateParams({ perPage }, true);
    },
    [updateParams]
  );

  const setStatusFilter = useCallback(
    (status: TaskStatus | "ALL") => {
      updateParams({ status }, true);
    },
    [updateParams]
  );

  const setPriorityFilter = useCallback(
    (priority: TaskPriority | "ALL") => {
      updateParams({ priority }, true);
    },
    [updateParams]
  );

  return {
    params: getCurrentParams(),
    goToPage,
    changePerPage,
    setStatusFilter,
    setPriorityFilter,
  };
};
