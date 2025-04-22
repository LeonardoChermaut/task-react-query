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

      <div className="flex justify-center items-center gap-4 p-8">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`flex items-center gap-1 px-2 py-1 text-xs rounded-xl transition-colors
      ${
        page === 1
          ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
          : "bg-white dark:bg-gray-900 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-gray-800 border border-emerald-200"
      }`}
        >
          <ChevronLeft size={16} />
        </button>

        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Página {page}
        </span>

        <button
          onClick={handleNextPage}
          disabled={(tasks?.length || 0) < TASKS_PER_PAGE}
          className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-xl transition-colors
      ${
        (tasks?.length || 0) < TASKS_PER_PAGE
          ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
          : "bg-white dark:bg-gray-900 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-gray-800 border border-emerald-200"
      }`}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
