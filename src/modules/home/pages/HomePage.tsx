import { TaskManager } from "@/modules/task/TaskManager.tsx";
import { FC } from "react";

export const HomePage: FC = () => {
  return (
    <main
      id="main-home-page"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w- w-300 text-center space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Sistema de Gerenciamento de Tarefas
        </h1>
        <TaskManager />
      </div>
    </main>
  );
};
