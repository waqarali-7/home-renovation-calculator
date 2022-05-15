// ----- ROUTES ----- //
import { routes } from "./routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(): JSX.Element {
  return (
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
