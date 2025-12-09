import { Routes, Route } from "react-router-dom";
import Sales from "../pages/Sales/Sales.tsx";
import { SalesProvider } from "../context/salesContext.tsx";
import PageNotFound from "../pages/PageNotFound/PageNotFound.tsx";
import App from "../App";


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route
          path="/"
          element={
            <SalesProvider>
              <Sales />
            </SalesProvider>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
