import { useSearchParams } from "react-router-dom";
import { TaskPriority, TaskStatus } from "../interface/interface.ts";

const defaultParams = {
  page: 1,
  perPage: 5,
} as const;

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParams = () => {
    const page = Number(searchParams.get("page")) || defaultParams.page;
    const perPage =
      Number(searchParams.get("perPage")) || defaultParams.perPage;
    const status = searchParams.get("status") as TaskStatus | "ALL";
    const priority = searchParams.get("priority") as TaskPriority | "ALL";
    return { page, perPage, status, priority };
  };

  const updateParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      newParams.set(key, value);
    });

    setSearchParams(newParams, { replace: true });
  };

  return {
    getParams,
    updateParams,
    defaultPage: String(defaultParams.page),
    defaultPerPage: String(defaultParams.perPage),
  };
};
