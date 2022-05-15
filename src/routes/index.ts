import React from "react";

// ----- PAGES ----- //
import Home from "../pages/Home";

// ----- LAYOUT -----//
import MainLayout from "../layouts/MainLayout";

interface Routes {
  path: string;
  name: string;
  component: React.FC;
  layout: React.FC<{ children: JSX.Element }>;
}

export const routes: Routes[] = [
  { path: "/", name: "Home", component: Home, layout: MainLayout },
];
