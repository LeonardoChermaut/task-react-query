import { createBrowserRouter } from "react-router-dom";

import { homeRouter } from "@/modules/home/homeRouter.tsx";
import { HomePage } from "@/modules/home/pages/HomePage.tsx";
import { routes } from "./routes.ts";

export const router = createBrowserRouter([
  {
    path: routes.home,
    children: [...homeRouter],
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    // ToDo: Criar uma página 404
    path: "*",
    element: (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white pb-5">
          Página não encontrada
        </h1>
        <a
          href={routes.home}
          className="text-blue-500 text-lg font-semibold border-b-2 hover:border-blue-700 transition duration-300"
        >
          Voltar para a home
        </a>
      </div>
    ),
  },
]);
