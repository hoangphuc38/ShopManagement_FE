import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import publicRoutes from "./routes";

function App() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Layout = route.layout;
          const Page = route.component;

          if (route.path === '/') {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Navigate to="/login" />
                }
              />
            )
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          )
        })}
      </Routes>
    </Router>
  );
}

export default App;
