// ----- ROUTES ----- //
import { useState } from "react";
import { routes } from "./routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResultContext } from "./contexts/ResultContext";
import { appInitial } from "./utils/initials";
import { ContextState, Row } from "./types";
function App(): JSX.Element {
  const [contextState, setState] = useState(appInitial);
  const updateContextState = (key: string, val: any) => {
    setState((current: ContextState) => ({
      ...current,
      [key]: val,
    }));
  };
  const addRows = (rows: Row[], row: Row) => {
    setState((current: ContextState) => ({
      ...current,
      rows: [...rows, row],
    }));
  };
  return (
    <ResultContext.Provider
      value={{ contextState, updateContextState, addRows }}
    >
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <AppRoute Component={route.component} Layout={route.layout} />
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </ResultContext.Provider>
  );
}

const AppRoute = ({
  Component,
  Layout,
}: {
  Component: any;
  Layout: any;
}): JSX.Element => {
  if (Layout) {
    return (
      <Layout>
        <Component />
      </Layout>
    );
  } else if (!Component) {
    return <Layout />;
  } else {
    return <Component />;
  }
};

export default App;
