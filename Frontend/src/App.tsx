import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import AboutUs from "./Pages/Aboutus";
import BookAppointment from "./Pages/Book-Appointment";
import ContectUs from "./Pages/ContectUs";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/book" element={<BookAppointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contect" element={<ContectUs />} />
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
