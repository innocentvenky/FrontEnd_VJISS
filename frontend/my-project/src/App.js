import { Routes, Route, useLocation } from "react-router-dom";
import AuthProvider from "./components/contexts/AuthContext";
import TokenNotifier from "./components/alerts/loginalert";
import Dashboard from "./components/DashBoard/dashboard";
import Courses from "./components/courses/courses";
import NavbarProvider from "./components/contexts/navbarContext";
import AboutCompany from "./components/aboutCompany/aboutcompany";
import InternshipOffers from "./components/internships/internships";
import JobNotifications from "./components/jobNotifications/jobnotifications";
import Trainers from "./components/trainers/about_trainers";
import Auth from "./components/authentication/MainAuth"; // Single Auth component

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <NavbarProvider>
        {/* Show token notifier except on login/signup pages */}
        {location.pathname !== "/login" && location.pathname !== "/signup" && <TokenNotifier />}

        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<Auth defaultForm="login" />} />
          <Route path="/signup" element={<Auth defaultForm="signup" />} />

          {/* Main app routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<AboutCompany />} />
          <Route path="/internship" element={<InternshipOffers />} />
          <Route path="/jobnotifications" element={<JobNotifications />} />
          <Route path="/trainers" element={<Trainers />} />

          {/* Fallback */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </NavbarProvider>
    </AuthProvider>
  );
}

export default App;
