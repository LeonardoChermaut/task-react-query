export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "ALL";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "ALL";

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: Omit<TaskStatus, "ALL">;
  priority: Omit<TaskPriority, "ALL">;
  dueDate: string;
}

export interface ITaskListResponse {
  tasks: ITask[];
}

export interface ITaskPaginatedResponse {
  tasks: ITask[];
  total: number;
}

export interface ITaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
}

export interface ICreateTaskPayload extends ITask {}

export interface IUpdateTaskPayload extends Partial<Omit<ITask, "id">> {}
