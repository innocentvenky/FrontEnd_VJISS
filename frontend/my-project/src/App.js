
import React, { useState,useEffect,useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AuthProvider from "./components/contexts/AuthContext";
//import TokenNotifier from "./components/alerts/loginalert";
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
import NewBatchForm from "./components/Admin/create_new-batch";
import JobNotificationForm from "./components/Admin/createJobnotifiy";
import AdminRoute from "./components/Routes/AdminRoute";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import Forbidden from "./components/Routes/forbidden";
//import { LoadingProvider } from "./components/contexts/LoadingContext";

import { registerLoadingSetter } from "./components/Loading/loadingHelper";
import LoadingSpinner from "./components/Loading/loading";
import { LoadingProvider,LoadingContext} from "./components/contexts/LoadingContext";

// const LoaderBridge = () => {
//   const { loading, setLoading } = useContext(LoadingContext);

//   useEffect(() => {
//     registerLoadingSetter(setLoading);
//   }, [setLoading]);

//   return loading ? <LoadingSpinner /> : null;
// };


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

  //const hideNotifierRoutes = ["/login", "/signup", "/forgotpassword"];

  return (
    <AuthProvider>
      <NavbarProvider>
        <CourseProvider>
          
        
{/* 
          {!hideNotifierRoutes.includes(location.pathname) && (
            <TokenNotifier setBlur={setBlur} />
          )}

          {!hideBackBtnRoutes.includes(location.pathname) && <BackButton />} */}

          <Routes>

            {/* 🌐 PUBLIC */}
            <Route path="/login" element={<Auth defaultForm="login" />} />
            <Route path="/signup" element={<Auth defaultForm="signup" />} />
            <Route path="/forgotpassword" element={<Auth defaultForm="forgotpassword" />} />
            <Route path="/403" element={<Forbidden />} />

            {/* 🔒 PROTECTED (LOGIN REQUIRED) */}
           

            <Route
              path="/"
              element={
               
                  <HomePage />
                
              }
            />

            <Route
              path="/courses"
              element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              }
            />

            <Route
              path="/course/:id"
              element={
                <ProtectedRoute>
                  <GetCourseDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <AboutCompany />
                </ProtectedRoute>
              }
            />

            <Route
              path="/internship"
              element={
                <ProtectedRoute>
                  <InternshipOffers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/jobnotifications"
              element={
                <ProtectedRoute>
                  <JobNotifications />
                </ProtectedRoute>
              }
            />

            <Route
              path="/trainers"
              element={
                <ProtectedRoute>
                  <Trainers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/carousel"
              element={
                <ProtectedRoute>
                  <Carousal />
                </ProtectedRoute>
              }
            />

            <Route
              path="/newbacth"
              element={
                <ProtectedRoute>
                  <BatchDetails />
                </ProtectedRoute>
              }
            />

            {/* 🔐 ADMIN ONLY */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminHome />
                </AdminRoute>
              }
            />

            <Route path="/courses_create" element={<AdminRoute><CourseWithSyllabusForm /></AdminRoute>} />

            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <AllUsers />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/internship_applications"
              element={
                <AdminRoute>
                  <InternshipApplications />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/course_enrolled_users"
              element={
                <AdminRoute>
                  <CourseEnrolledUsers />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/create_internship"
              element={
                <AdminRoute>
                  <CreateInternship />
                </AdminRoute>
              }
            />

            <Route
              path="/createnewbatch"
              element={
                <AdminRoute>
                  <NewBatchForm />
                </AdminRoute>
              }
            />

            <Route
              path="/createjobnotification"
              element={
                <AdminRoute>
                  <JobNotificationForm />
                </AdminRoute>
              }
            />

            {/* ❌ 404 */}
            <Route path="*" element={<div>404 Not Found</div>} />

          </Routes>

        </CourseProvider>
      </NavbarProvider>
    </AuthProvider>
  );
}

export default App;
