import { ChevronLeft, ChevronRight } from "lucide-react";
import { FunctionComponent } from "react";

type PaginationControlsProps = {
  page: number;
  perPage: number;
  hasNextPage: boolean;
  onPageChange: (newPage: number) => void;
  onPerPageChange: (perPage: number) => void;
};

const perPageOptions = [5, 10, 15, 20] as const;

export const PaginationControls: FunctionComponent<PaginationControlsProps> = ({
  page,
  perPage,
  hasNextPage,
  onPageChange,
  onPerPageChange,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 px-6 py-4">
      <div className="flex-grow" />

      <div className="flex items-center gap-3 mx-auto">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-xl transition-colors ${
            page === 1
              ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
              : "bg-white dark:bg-gray-900 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-gray-800 border border-emerald-200"
          }`}
          aria-label="Página anterior"
        >
          <ChevronLeft size={16} />
        </button>

        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Página <span className="font-semibold">{page}</span>
        </span>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNextPage}
          className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-xl transition-colors ${
            !hasNextPage
              ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
              : "bg-white dark:bg-gray-900 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-gray-800 border border-emerald-200"
          }`}
          aria-label="Próxima página"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex-grow flex justify-end">
        <select
          value={perPage}
          onChange={({ target: { value } }) => onPerPageChange(Number(value))}
          className="bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label="Itens por página"
        >
          {perPageOptions.map((option) => (
            <option key={option} value={option}>
              {option} por página
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
