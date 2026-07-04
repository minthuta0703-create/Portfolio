import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layout/RootLayout";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { ProjectDetail } from "./pages/ProjectDetail";
import { Story } from "./pages/Story";
import { Notebook } from "./pages/Notebook";
import { ConceptDetail } from "./pages/ConceptDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "projects", Component: Projects },
      { path: "projects/:id", Component: ProjectDetail },
      { path: "story", Component: Story },
      { path: "notebook", Component: Notebook },
      { path: "notebook/:id", Component: ConceptDetail },
    ],
  },
]);
