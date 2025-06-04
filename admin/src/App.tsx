import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/Dashboard";
import Newpaient from "./pages/Newpaient";
import Oldpaient from "./pages/Oldpatient";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/add" element={<Newpaient />} />
          <Route path="/old" element={<Oldpaient />} />
          <Route
            path="*"
            element={
              <div className="text-center text-red-600 p-10 text-xl">
                404 - Page not found
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
