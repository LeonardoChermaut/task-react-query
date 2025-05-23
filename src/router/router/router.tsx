import { createBrowserRouter } from "react-router-dom";

import { homeRouter } from "@/modules/home/homeRouter.tsx";
import { notFoundRouter } from "@/modules/notfound/notFoundRouter.tsx";
import { NotFoundPage } from "@/modules/notfound/pages/NotFoundPage.tsx";
import { routes } from "./routes.ts";

export const router = createBrowserRouter([
  {
    path: routes.home,
    children: [...homeRouter, ...notFoundRouter],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
