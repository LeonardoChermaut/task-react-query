import { TaskPriority, TaskStatus } from "@/shared/interface/interface.js";
import { Filter } from "lucide-react";
import { FunctionComponent } from "react";

type TaskFilterProps = {
  statusFilter: TaskStatus;
  priorityFilter: TaskPriority;
  onStatusChange: (status: TaskStatus) => void;
  onPriorityChange: (priority: TaskPriority) => void;
};

export const TaskFilter: FunctionComponent<TaskFilterProps> = ({
  statusFilter,
  priorityFilter,
  onStatusChange,
  onPriorityChange,
}) => {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-1 flex-1">
          <Filter size={16} className="text-gray-500 dark:text-gray-300" />
          <span className="text-gray-600 dark:text-gray-300">Filtros:</span>
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
            onChange={(e) =>
              onStatusChange((e.target.value as TaskStatus) || "ALL")
            }
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
              onPriorityChange((e.target.value as TaskPriority) || "ALL")
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
  );
};
