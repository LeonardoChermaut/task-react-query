import { useCreateTask, useTasks, useUpdateTask } from "@/shared/hook/hook.js";
import { ITask } from "@/shared/interface/interface.js";
import { Save, X } from "lucide-react";
import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";

type TaskFormProps = {
  task?: ITask;
  onCancel: () => void;
};

export const TaskForm: FunctionComponent<TaskFormProps> = ({
  onCancel,
  task,
}) => {
  const [formData, setFormData] = useState<Omit<ITask, "id">>(
    task
      ? {
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate,
        }
      : ({
          title: "",
          description: "",
          status: "PENDING",
          priority: "MEDIUM",
          dueDate: "",
        } as const)
  );

  const { data: tasks } = useTasks();
  const { mutate: createTask } = useCreateTask();
  const { mutate: updateTask } = useUpdateTask();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (task) {
      updateTask({
        id: task.id,
        data: formData,
      });
    } else {
      createTask({
        id: tasks?.length ? Number(tasks[tasks.length - 1].id) + 1 : 1,
        ...formData,
      });
    }

    onCancel();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {task ? "Editar Tarefa" : "Nova Tarefa"}
        </h3>
        <button
          onClick={onCancel}
          className="flex p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <X size={20} className="text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="title"
              className="text-start font-medium text-gray-700 dark:text-gray-300"
            >
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData?.title}
              onChange={handleChange}
              required
              placeholder="Digite o título da tarefa"
              className="flex w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="description"
              className="text-start font-medium text-gray-700 dark:text-gray-300"
            >
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={formData?.description}
              onChange={handleChange}
              rows={3}
              placeholder="Descreva a tarefa"
              className="flex w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col gap-1 flex-1">
              <label
                htmlFor="status"
                className="text-start font-medium text-gray-700 dark:text-gray-300"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData?.status}
                onChange={handleChange}
                className="flex w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="PENDING">Pendente</option>
                <option value="IN_PROGRESS">Em Progresso</option>
                <option value="COMPLETED">Concluída</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <label
                htmlFor="priority"
                className="text-start font-medium text-gray-700 dark:text-gray-300"
              >
                Prioridade
              </label>
              <select
                id="priority"
                name="priority"
                value={formData?.priority}
                onChange={handleChange}
                className="flex w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="LOW">Baixa</option>
                <option value="MEDIUM">Média</option>
                <option value="HIGH">Alta</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <label
                htmlFor="dueDate"
                className="text-start font-medium text-gray-700 dark:text-gray-300 "
              >
                Data de Vencimento
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData?.dueDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition"
          >
            <Save size={18} />
            {task ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
};
