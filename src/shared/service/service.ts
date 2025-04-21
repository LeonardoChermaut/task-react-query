import {
  ICreateTaskPayload,
  ITask,
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

  async getAll(): Promise<ITask[]> {
    const response = await fetch(this.BASE_URL, {
      method: "GET",
      headers: this.headers,
    });

    return response.json();
  }

  async getById(id: number): Promise<ITask> {
    const response = await fetch(`${this.BASE_URL}/id?=${id}`, {
      method: "GET",
      headers: this.headers,
    });

    return response.json();
  }

  async create(data: ICreateTaskPayload): Promise<ITask> {
    const response = await fetch(`${this.BASE_URL}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    });

    return response.json();
  }

  async update(
    id: number | string,
    updates: IUpdateTaskPayload
  ): Promise<ITask> {
    const response = await fetch(`${this.BASE_URL}/${id}`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(updates),
    });

    return response.json();
  }

  async delete(id: number | string): Promise<ITask> {
    const response = await fetch(`${this.BASE_URL}/${id}`, {
      method: "DELETE",
      headers: this.headers,
    });

    return await response.json();
  }
}

export const taskService = TaskService.getInstance();
