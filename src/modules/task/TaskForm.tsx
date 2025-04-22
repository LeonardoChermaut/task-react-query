import { useCreateTask, useTasks, useUpdateTask } from "@/shared/hook/hook.js";
import { ITask } from "@/shared/interface/interface.js";
import { Save, X } from "lucide-react";
import { FormEvent, FunctionComponent, useRef } from "react";

type TaskFormProps = {
  task?: ITask;
  onCancel: () => void;
};

export const TaskForm: FunctionComponent<TaskFormProps> = ({
  onCancel,
  task,
}) => {
  const { data } = useTasks();
  const { mutate: createTask } = useCreateTask();
  const { mutate: updateTask } = useUpdateTask();

  const tasks: ITask[] = data || [];

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef?.current);
    const data: Omit<ITask, "id"> = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as ITask["status"],
      priority: formData.get("priority") as ITask["priority"],
      dueDate: formData.get("dueDate") as string,
    };

    if (task) {
      updateTask({ id: task.id, data });
    } else {
      const newId = (Number(tasks.at(-1)?.id || 0) + 1).toString();
      createTask({ id: newId, ...data });
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
        ref={formRef}
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
              defaultValue={task?.title || ""}
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
              defaultValue={task?.description || ""}
              required
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
                defaultValue={task?.status || "PENDING"}
                required
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
                defaultValue={task?.priority || "LOW"}
                required
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
                defaultValue={task?.dueDate || ""}
                required
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
