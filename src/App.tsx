import { Suspense, useState } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import CCTVPage from "./pages/CCTVPage";
import CityMapPage from "./pages/CityMapPage";
import MetricsPage from "./pages/MetricsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import routes from "tempo-routes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string>("public");

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cctv"
            element={
              <CCTVPage isAuthenticated={isAuthenticated} userRole={userRole} />
            }
          />
          <Route
            path="/map"
            element={
              <CityMapPage
                isAuthenticated={isAuthenticated}
                userRole={userRole}
              />
            }
          />
          <Route
            path="/metrics"
            element={
              <MetricsPage
                isAuthenticated={isAuthenticated}
                userRole={userRole}
              />
            }
          />
          <Route
            path="/reports"
            element={
              <ReportsPage
                isAuthenticated={isAuthenticated}
                userRole={userRole}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <SettingsPage
                isAuthenticated={isAuthenticated}
                userRole={userRole}
              />
            }
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
