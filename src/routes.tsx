import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { DetailLayout } from "./components/layout/DetailLayout";
import { ProjectDetail } from "./pages/ProjectDetail";
import { ConceptDetail } from "./pages/ConceptDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      // The single-page site with its own full-screen chrome
      { index: true, Component: Landing },
      {
        Component: DetailLayout,
        children: [
          { path: "projects/:id", Component: ProjectDetail },
          { path: "notebook/:id", Component: ConceptDetail },
        ],
      },
    ],
  },
]);
