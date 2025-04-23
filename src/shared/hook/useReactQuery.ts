import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  ICreateTaskPayload,
  ITask,
  IUpdateTaskPayload,
} from "../interface/interface.ts";
import { taskService } from "../service/service.ts";

export const queryKeys = {
  tasks: {
    all: ["tasks"] as const,
    paginated: (page: number, limit: number) =>
      [...queryKeys.tasks.all, "paginated", page, limit] as const,
  },
};

export const useTaskPaginated = (
  page: number,
  limit: number,
  filters?: { status?: string; priority?: string }
) => {
  return useQuery({
    queryKey: queryKeys.tasks.paginated(page, limit),
    queryFn: () => taskService.getPaginated(page, limit, filters),
    placeholderData: keepPreviousData,
  });
};

export const useTasks = () => {
  return useQuery({
    queryKey: queryKeys.tasks.all,
    queryFn: () => taskService.getAll(),
    placeholderData: [],
  });
};

export const useTaskById = (id: number) => {
  return useQuery({
    queryKey: [...queryKeys.tasks.all, id],
    queryFn: () => taskService.getById(id),
    enabled: !!id,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateTaskPayload) => taskService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateTaskPayload }) =>
      taskService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tasks.all,
        refetchType: "active",
        exact: false,
      });
    },
    onError: (_, __, context: { previousTasks?: ITask[] } | undefined) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(queryKeys.tasks.all, context.previousTasks);
      }
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
    },
  });
};
