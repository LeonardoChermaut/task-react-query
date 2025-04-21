export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface ITask {
  id: number | string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

export interface ITaskListResponse {
  tasks: ITask[];
}

export interface ICreateTaskPayload extends ITask {}

export interface IUpdateTaskPayload extends Partial<Omit<ITask, "id">> {}
