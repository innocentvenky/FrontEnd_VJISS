
import React, { useState } from "react";
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
import Auth from "./components/authentication/MainAuth";
import CourseWithSyllabusForm from "./components/courses/create_course";
import BackButton from "./components/BackButton";
import HomePage from "./components/HomePage/Homepage";
import AdminHome from "./components/Admin/adminHome";
import AllUsers from "./components/Admin/allusers";
import InternshipApplications from "./components/Admin/InternshipApplications";
import CourseEnrolledUsers from "./components/Admin/CourseEnrolledUsers";
import CreateInternship from "./components/Admin/CreateInternship";
import GetCourseDetails from "./components/courses/getCourseDetaILS.";
import Carousal from "./components/caurosel";
import BatchDetails from "./components/newbacths/newbacths";
import { CourseProvider } from "./components/contexts/enrollContext";

function App() {
  const location = useLocation();
    const [blur, setBlur] = useState(false);

  const hideBackBtnRoutes = [
    "/",
    "/home",
    "/login",
    "/signup",
    "/forgotpassword",
  ];

  const hideNotifierRoutes = ["/login", "/signup", "/forgotpassword"];


  return (
    <AuthProvider>
      <NavbarProvider>
        <CourseProvider>

          {/* ✅ TOKEN NOTIFIER (ONLY ONCE) */}
          {!hideNotifierRoutes.includes(location.pathname) && (
            <TokenNotifier setBlur={setBlur} />
          )}

          {/* 🔙 GLOBAL BACK BUTTON */}
          {!hideBackBtnRoutes.includes(location.pathname) && (
            <BackButton />
          )}

          <Routes>
            <Route path="/login" element={<Auth defaultForm="login" />} />
            <Route path="/signup" element={<Auth defaultForm="signup" />} />
            <Route
              path="/forgotpassword"
              element={<Auth defaultForm="forgotpassword" />}
            />

            <Route path="/" element={<Dashboard blur={blur} setBlur={setBlur} />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<GetCourseDetails />} />
            <Route path="/about" element={<AboutCompany />} />
            <Route path="/internship" element={<InternshipOffers />} />
            <Route path="/jobnotifications" element={<JobNotifications />} />
            <Route path="/courses_create" element={<CourseWithSyllabusForm />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/home" element={<HomePage />} />

            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/users" element={<AllUsers />} />
            <Route
              path="/admin/internship_applications"
              element={<InternshipApplications />}
            />
            <Route
              path="/admin/course_enrolled_users"
              element={<CourseEnrolledUsers />}
            />
            <Route
              path="/admin/create_internship"
              element={<CreateInternship />}
            />

            <Route path="/carousel" element={<Carousal />} />
            <Route path="/newbacth" element={<BatchDetails />} />

            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>

        </CourseProvider>
      </NavbarProvider>
    </AuthProvider>
  );
}

export default App;
