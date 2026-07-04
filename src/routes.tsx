import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layout/RootLayout";
import { Landing } from "./pages/Landing";
import { Projects } from "./pages/Projects";
import { ProjectDetail } from "./pages/ProjectDetail";
import { Story } from "./pages/Story";
import { Notebook } from "./pages/Notebook";
import { ConceptDetail } from "./pages/ConceptDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      // Landing has its own full-screen chrome (no shared header/footer)
      { index: true, Component: Landing },
      {
        Component: RootLayout,
        children: [
          { path: "projects", Component: Projects },
          { path: "projects/:id", Component: ProjectDetail },
          { path: "story", Component: Story },
          { path: "notebook", Component: Notebook },
          { path: "notebook/:id", Component: ConceptDetail },
        ],
      },
    ],
  },
]);
