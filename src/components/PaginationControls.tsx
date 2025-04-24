import { ChevronLeft, ChevronRight } from "lucide-react";
import { FunctionComponent } from "react";

type PaginationControlsProps = {
  currentPage: number;
  perPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
};

const perPageOptions = [5, 10, 15, 20] as const;

export const PaginationControls: FunctionComponent<PaginationControlsProps> = ({
  currentPage,
  perPage,
  totalPages,
  onPageChange,
  onPerPageChange,
}) => {
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const handlePrevPage = () => onPageChange(currentPage - 1);
  const handleNextPage = () => onPageChange(currentPage + 1);

  return (
    <div className="flex flex-wrap items-center gap-4 px-6 py-4">
      <div className="flex-grow" />

      <div className="flex items-center gap-3 mx-auto">
        <button
          onClick={handlePrevPage}
          disabled={!hasPrevPage}
          className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-xl transition-colors ${
            !hasPrevPage
              ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
              : "bg-white dark:bg-gray-900 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-gray-800 border border-emerald-200"
          }`}
          aria-label="Página anterior"
        >
          <ChevronLeft size={16} />
        </button>

        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Página <span className="font-semibold">{currentPage}</span>
        </span>

        <button
          onClick={handleNextPage}
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
