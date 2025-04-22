import { useDeleteTask } from "@/shared/hook/hook.js";
import {
  ITask,
  TaskPriority,
  TaskStatus,
} from "@/shared/interface/interface.js";
import { Filter } from "lucide-react";
import { FunctionComponent, useMemo, useState } from "react";
import { TaskItem } from "./TaskItem.tsx";

type TaskListProps = {
  tasks?: ITask[];
  isLoading?: boolean;
  isError?: boolean;
  onEdit: (task: ITask) => void;
};

export const TaskList: FunctionComponent<TaskListProps> = ({
  tasks,
  isLoading,
  isError,
  onEdit,
}) => {
  const { mutate: deleteTask } = useDeleteTask();

  const [statusFilter, setStatusFilter] = useState<TaskStatus | "ALL">("ALL");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "ALL">(
    "ALL"
  );

  const data = useMemo<ITask[]>(() => {
    return tasks?.length > 0 ? tasks : ([] as ITask[]);
  }, [tasks]);

  const filteredTasks = data.filter((task) => {
    const matchesStatus =
      statusFilter === "ALL" || task.status === statusFilter;
    const matchesPriority =
      priorityFilter === "ALL" || task.priority === priorityFilter;

    return matchesStatus && matchesPriority;
  });

  if (isLoading) {
    return <p className="p-4">Carregando tarefas...</p>;
  }

  if (isError) {
    return <p className="p-4 text-red-500">Erro ao carregar tarefas.</p>;
  }

  return (
    <div>
      <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-1 flex-1">
            <Filter size={16} className="text-gray-500 dark:text-gray-300" />
            <span className="text-white text-gray-600 dark:text-gray-300">
              Filtros:
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="status-filter"
              className="text-sm text-gray-600 dark:text-gray-300"
            >
              Status:
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as TaskStatus)}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            >
              <option value="ALL">Todos</option>
              <option value="PENDING">Pendente</option>
              <option value="IN_PROGRESS">Em Progresso</option>
              <option value="COMPLETED">Concluída</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="priority-filter"
              className="text-sm text-gray-600 dark:text-gray-300"
            >
              Prioridade:
            </label>
            <select
              id="priority-filter"
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value as TaskPriority)
              }
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            >
              <option value="ALL">Todas</option>
              <option value="HIGH">Alta</option>
              <option value="MEDIUM">Média</option>
              <option value="LOW">Baixa</option>
            </select>
          </div>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="p-8 text-center justify-center align-center div flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5058/5058432.png"
            alt="Nenhuma tarefa"
            className="opacity-50 w-30 h-30"
          />
          <p className="text-gray-500 dark:text-gray-400 pt-4">
            Nenhuma tarefa encontrada com os filtros selecionados.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={(id) => deleteTask(id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
