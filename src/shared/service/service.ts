import {
  ICreateTaskPayload,
  ITask,
  ITaskPaginatedResponse,
  IUpdateTaskPayload,
} from "../interface/interface.js";

export class TaskService {
  private static instance: TaskService;
  private readonly BASE_URL = "http://localhost:3000/tasks";
  private readonly headers = {
    "Content-Type": "application/json",
  };

  public static getInstance() {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService();
    }

    return TaskService.instance;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        `HTTP Error ${response.status}: ${
          errorData?.message || response.statusText
        }`
      );
    }

    return response.json();
  }

  async getAll(): Promise<ITask[]> {
    try {
      const response = await fetch(this.BASE_URL, {
        method: "GET",
        headers: this.headers,
      });

      return this.handleResponse<ITask[]>(response);
    } catch (error) {
      throw new Error(
        `Failed to fetch tasks: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async getPaginated(
    page: number,
    limit: number,
    filters?: { status?: string; priority?: string }
  ): Promise<ITaskPaginatedResponse> {
    try {
      const params = new URLSearchParams({
        _page: page.toString(),
        _limit: limit.toString(),
        ...(filters?.status && { status: filters.status }),
        ...(filters?.priority && { priority: filters.priority }),
      });

      const replacedParams = params.toString().replace("_limit", "_per_page");
      const response = await fetch(`${this.BASE_URL}?${replacedParams}`, {
        method: "GET",
        headers: this.headers,
      });

      const { data: tasks, items: total } = await this.handleResponse<{
        items: number;
        data: ITask[];
      }>(response);

      return { tasks, total };
    } catch (error) {
      throw new Error(
        `Failed to fetch paginated tasks: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async getById(id: number): Promise<ITask> {
    try {
      const response = await fetch(`${this.BASE_URL}/${id}`, {
        method: "GET",
        headers: this.headers,
      });

      return this.handleResponse<ITask>(response);
    } catch (error) {
      throw new Error(
        `Failed to fetch task ${id}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async create(data: ICreateTaskPayload): Promise<ITask> {
    try {
      const response = await fetch(this.BASE_URL, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data),
      });

      return this.handleResponse<ITask>(response);
    } catch (error) {
      throw new Error(
        `Failed to create task: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async update(id: string, updates: IUpdateTaskPayload): Promise<ITask> {
    try {
      const response = await fetch(`${this.BASE_URL}/${id}`, {
        method: "PUT",
        headers: this.headers,
        body: JSON.stringify(updates),
      });

      return this.handleResponse<ITask>(response);
    } catch (error) {
      throw new Error(
        `Failed to update task ${id}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async delete(id: string): Promise<ITask> {
    try {
      const response = await fetch(`${this.BASE_URL}/${id}`, {
        method: "DELETE",
        headers: this.headers,
      });

      return this.handleResponse<ITask>(response);
    } catch (error) {
      throw new Error(
        `Failed to delete task ${id}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}

export const taskService = TaskService.getInstance();
