import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce.ts";
import { useQueryParams } from "./useQueryParams.ts";

export const useTaskFilters = () => {
  const { getParams, updateParams } = useQueryParams();
  const { status, priority } = getParams();

  const [statusFilter, setStatusFilter] = useState(status || "ALL");
  const [priorityFilter, setPriorityFilter] = useState(priority || "ALL");

  const debouncedStatus = useDebounce(statusFilter, 300);
  const debouncedPriority = useDebounce(priorityFilter, 300);

  useEffect(() => {
    const params: Record<string, string> = {};

    if (debouncedStatus !== "ALL") params.status = debouncedStatus;
    if (debouncedPriority !== "ALL") params.priority = debouncedPriority;

    updateParams(params);
  }, [debouncedStatus, debouncedPriority]);

  return {
    statusFilter,
    priorityFilter,
    setStatusFilter,
    setPriorityFilter,
  };
};
