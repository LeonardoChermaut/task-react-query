import { useTasks } from "@/shared/hook/hook.js";
import { ITask } from "@/shared/interface/interface.js";
import { PlusCircle } from "lucide-react";
import { FunctionComponent, useMemo, useState } from "react";
import { TaskForm } from "./TaskForm.tsx";
import { TaskList } from "./TaskList.tsx";

export const TaskManager: FunctionComponent = () => {
  const { data, isLoading, isError } = useTasks();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<ITask>(null);

  const tasks = useMemo(() => {
    return data || [];
  }, [data]) as ITask[];

  const handleEdit = (task: ITask) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  if (isLoading) {
    return <p className="p-4">Carregando tarefas...</p>;
  }

  if (isError) {
    return <p className="p-4 text-red-500">Erro ao carregar tarefas.</p>;
  }

  if (tasks.length === 0 && !isLoading) {
    return (
      <main
        id="main-task-manager-empty"
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden w-full"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Minhas Tarefas
          </h2>
          <button
            onClick={() => {
              setEditingTask(null);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <PlusCircle size={18} />
            <span>Nova Tarefa</span>
          </button>
        </div>

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
      </main>
    );
  }

  return (
    <main
      id="main-task-manager"
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden w-full"
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Minhas Tarefas
        </h2>
        <button
          onClick={() => {
            setEditingTask(null);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <PlusCircle size={18} />
          <span>Nova Tarefa</span>
        </button>
      </div>

      {isFormOpen ? (
        <TaskForm
          onCancel={() => {
            setIsFormOpen(false);
            setEditingTask(null);
          }}
          task={editingTask}
        />
      ) : (
        <TaskList onEdit={handleEdit} />
      )}
    </main>
  );
};
