import { PaginationControls } from "@/components/PaginationControls.tsx";
import { useDeleteTask } from "@/shared/hook/useReactQuery.ts";
import { useTaskPagination } from "@/shared/hook/useTaskPagination.ts";
import {
  ITask,
  TaskPriority,
  TaskStatus,
} from "@/shared/interface/interface.js";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { TaskFilter } from "./TaskFilter.tsx";
import { TaskItem } from "./TaskItem.tsx";

type TaskListProps = {
  onEdit: (task: ITask) => void;
};

export const TaskList: FunctionComponent<TaskListProps> = ({ onEdit }) => {
  const [statusFilter, setStatusFilter] = useState<TaskStatus>("ALL");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority>("ALL");

  const {
    tasks: paginatedTasks,
    currentPage,
    perPage,
    isLoading,
    isError,
    totalPages,
    goToNextPage,
    goToPrevPage,
    setPage,
    changePerPage,
  } = useTaskPagination();

  const { mutate: deleteTask } = useDeleteTask();

  const data: ITask[] = paginatedTasks || [];
  const tasks = data?.length > 0 ? data : [];

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = statusFilter === "ALL" || task.status === statusFilter;
    const priorityMatch =
      priorityFilter === "ALL" || task.priority === priorityFilter;

    return statusMatch && priorityMatch;
  });

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage > currentPage) goToNextPage();
      else if (newPage < currentPage) goToPrevPage();
    },
    [currentPage, goToNextPage, goToPrevPage]
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      goToPrevPage();
    } else if (currentPage < totalPages) {
      goToNextPage();
    } else {
      setPage(currentPage);
    }
  }, [totalPages]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="dark:text-gray-400 text-center pb-4 pr-4 text-gray-500 font-bold">
          Carregando tarefas...
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png"
          alt="Carregando..."
          className="opacity-50 w-5 h-5 animate-spin"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center p-8 flex-col">
        <p className="dark:text-gray-400 text-center pb-9 text-gray-500 font-bold">
          Erro ao carregar tarefas.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/675/675564.png"
          alt="Erro ao carregar tarefas"
          className="opacity-50 w-30 h-30 animate-bounce"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <TaskFilter
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
      />

      {filteredTasks.length === 0 && (
        <div className="flex-1 p-8 text-center flex flex-col items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5058/5058432.png"
            alt="Nenhuma tarefa"
            className="opacity-50 w-30 h-30"
          />
          <p className="text-gray-500 dark:text-gray-400 pt-4">
            Nenhuma tarefa encontrada com os filtros selecionados.
          </p>
        </div>
      )}

      {filteredTasks.length > 0 && (
        <div className="flex-1 overflow-y-auto">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={() => deleteTask(task.id)}
              />
            ))}
          </ul>
        </div>
      )}

      <PaginationControls
        currentPage={currentPage}
        perPage={perPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPerPageChange={changePerPage}
      />
    </div>
  );
};
