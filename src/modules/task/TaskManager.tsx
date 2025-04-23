import { Dialog } from "@/components/Dialog.tsx";
import { ITask } from "@/shared/interface/interface.js";
import { PlusCircle } from "lucide-react";
import { FunctionComponent, useState } from "react";
import { TaskForm } from "./TaskForm.tsx";
import { TaskList } from "./TaskList.tsx";

export const TaskManager: FunctionComponent = () => {
  const [openTaskForm, setOpenTaskForm] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);

  const handleEdit = (task: ITask) => {
    setEditingTask(task);
    setOpenTaskForm(true);
  };

  const handleCloseForm = () => {
    setOpenTaskForm(false);
    setEditingTask(null);
  };

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
            setOpenTaskForm(true);
          }}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <PlusCircle size={18} />
          <span>Nova Tarefa</span>
        </button>
      </div>

      <Dialog isOpen={openTaskForm}>
        <TaskForm onCancel={handleCloseForm} task={editingTask} />
      </Dialog>

      <TaskList onEdit={handleEdit} />
    </main>
  );
};
