import { useTasks } from "@/shared/hook/hook.js";
import { ITask } from "@/shared/interface/interface.js";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FunctionComponent, useState } from "react";
import { TaskList } from "./TaskList.tsx";

type PaginatedTaskListProps = {
  onEdit: (task: ITask) => void;
};

const TASKS_PER_PAGE = 5;

export const PaginatedTaskList: FunctionComponent<PaginatedTaskListProps> = ({
  onEdit,
}) => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isError } = useTasks(page, TASKS_PER_PAGE);

  const tasks = data?.tasks.length > 0 ? data.tasks : ([] as ITask[]);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div>
      <TaskList
        tasks={tasks}
        onEdit={onEdit}
        isLoading={isLoading}
        isError={isError}
      />

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md transition
      ${
        page === 1
          ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      }`}
        >
          <ChevronLeft size={16} />
          Anterior
        </button>

        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Página <span className="font-semibold ">{page}</span>
        </span>

        <button
          onClick={handleNextPage}
          disabled={(tasks?.length || 0) < TASKS_PER_PAGE}
          className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md transition
      ${
        (tasks?.length || 0) < TASKS_PER_PAGE
          ? "bg-gray-100 dark:bg-gray-800 text-emerald-500 cursor-not-allowed"
          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      }`}
        >
          Próxima
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
