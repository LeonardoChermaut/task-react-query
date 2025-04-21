import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu.js";
import { useDeleteTask } from "@/shared/hook/hook.js";
import { ITask } from "@/shared/interface/interface.js";
import { formatDate } from "@/shared/utils/utils.js";
import { AlertTriangle, Clock, Edit, MoreVertical, Trash2 } from "lucide-react";
import { FunctionComponent } from "react";

type TaskItemProps = {
  task: ITask;
  onEdit: (task: ITask) => void;
  onDelete: (id: number | string) => void;
};

const taskStatusMappedClasses = {
  PENDING:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  IN_PROGRESS: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  COMPLETED:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
} as const;

const taskPriorityMappedIcons = {
  LOW: <AlertTriangle size={13} className="text-green-500" />,
  MEDIUM: <AlertTriangle size={13} className="text-yellow-500" />,
  HIGH: <AlertTriangle size={13} className="text-red-500" />,
} as const;

export const TaskItem: FunctionComponent<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
}) => {
  const { mutate: deleteTask } = useDeleteTask();

  const handleDelete = (id: number | string) => {
    deleteTask(id);
    onDelete(id);
  };

  return (
    <li className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
      <div className="flex flex-1 items-start gap-3">
        {/* Conteúdo principal */}
        <div className="flex flex-col flex-grow gap-2 min-w-0">
          {/* Linha do título e status */}
          <div className="flex items-baseline gap-2">
            <h3 className="flex-shrink-0 font-medium text-gray-900 dark:text-white truncate">
              {task.title}
            </h3>
            <span
              className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full ${
                taskStatusMappedClasses[
                  task.status as keyof typeof taskStatusMappedClasses
                ]
              }`}
            >
              {task.status === "PENDING"
                ? "Pendente"
                : task.status === "IN_PROGRESS"
                ? "Em Progresso"
                : "Concluída"}
            </span>
          </div>

          {/* Descrição */}
          {task.description && (
            <div className="flex">
              <p className="text-sm text-gray-600 dark:text-gray-300 font-light line-clamp-2">
                {task.description}
              </p>
            </div>
          )}

          {/* Metadados */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1 flex-shrink-0">
              {
                taskPriorityMappedIcons[
                  task.priority as keyof typeof taskPriorityMappedIcons
                ]
              }
              <span>
                Prioridade:{" "}
                {task.priority === "HIGH"
                  ? "Alta"
                  : task.priority === "MEDIUM"
                  ? "Média"
                  : "Baixa"}
              </span>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <Clock size={14} />
              <span>Prazo: {formatDate(task.dueDate)}</span>
            </div>
          </div>
        </div>

        {/* Menu de ações */}
        <div className="flex flex-shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <MoreVertical
                  size={18}
                  className="text-gray-500 dark:text-gray-400"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-20 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
            >
              <DropdownMenuItem
                onClick={() => onEdit(task)}
                className="flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Edit size={16} className="text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Editar
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(task.id.toString())}
                className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Trash2 size={16} />
                <span className="text-sm">Excluir</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </li>
  );
};
