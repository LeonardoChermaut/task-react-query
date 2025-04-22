import { useTasks } from "@/shared/hook/hook.js";
import { ITask } from "@/shared/interface/interface.js";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FunctionComponent, useState } from "react";
import { TaskList } from "./TaskList.tsx";

type PaginatedTaskListProps = {
  onEdit: (task: ITask) => void;
};

const pagination = {
  page: 1,
  perPage: 5,
} as const;

export const PaginatedTaskList: FunctionComponent<PaginatedTaskListProps> = ({
  onEdit,
}) => {
  const [page, setPage] = useState<number>(pagination.page);
  const [perPage, setPerPage] = useState<number>(pagination.perPage);
  const { data, isLoading, isError } = useTasks(page, perPage);

  const tasks: ITask[] = data?.tasks || [];

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const handleChangePerPage = (value: number) => {
    setPerPage(value);
    setPage(1);
  };

  return (
    <>
      <TaskList
        tasks={tasks}
        onEdit={onEdit}
        isLoading={isLoading}
        isError={isError}
      />

      <div className="flex flex-wrap items-center gap-4 px-6 p-8">
        <div className="flex-grow" />

        <div className="flex items-center gap-3 mx-auto">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-xl transition-colors
        ${
          page === 1
            ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
            : "bg-white dark:bg-gray-900 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-gray-800 border border-emerald-200"
        }`}
          >
            <ChevronLeft size={16} />
          </button>

          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Página <span className="font-semibold">{page}</span>
          </span>

          <button
            onClick={handleNextPage}
            disabled={(tasks?.length || 0) < perPage}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-xl transition-colors
        ${
          (tasks?.length || 0) < perPage
            ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
            : "bg-white dark:bg-gray-900 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-gray-800 border border-emerald-200"
        }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="flex-grow flex justify-end">
          <select
            className="bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={perPage}
            onChange={({ target: { value } }) => {
              handleChangePerPage(Number(value));
            }}
          >
            <option value={5}>5 por página</option>
            <option value={10}>10 por página</option>
            <option value={15}>15 por página</option>
            <option value={20}>20 por página</option>
          </select>
        </div>
      </div>
    </>
  );
};
