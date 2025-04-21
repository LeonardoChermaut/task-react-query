import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ICreateTaskPayload,
  ITask,
  IUpdateTaskPayload,
} from "../interface/interface.js";
import { taskService } from "../service/service.js";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => taskService.getAll(),
  });
};

export const useTaskById = (id: number) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => taskService.getById(id),
    enabled: !!id,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateTaskPayload) => taskService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number | string;
      data: IUpdateTaskPayload;
    }) => taskService.update(id, data),
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(["tasks"], (old: ITask[] = []) =>
        old.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => taskService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useReactQueryClient = () => {
  return {
    useDeleteTask,
    useUpdateTask,
    useCreateTask,
    useTaskById,
    useTasks,
  };
};
