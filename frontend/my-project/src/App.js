import React, { useEffect, useContext, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import AuthProvider from "./components/contexts/AuthContext";
import NavbarProvider from "./components/contexts/navbarContext";
import { CourseProvider } from "./components/contexts/enrollContext";
import { LoadingProvider, LoadingContext } from "./components/contexts/LoadingContext";

import ProtectedRoute from "./components/Routes/ProtectedRoute";
import AdminRoute from "./components/Routes/AdminRoute";

import { registerLoadingSetter } from "./components/Loading/loadingHelper";
import LoadingSpinner from "./components/Loading/loading";

/* 🔹 Lazy Pages */
const HomePage = React.lazy(() => import("./components/HomePage/Homepage"));
const Auth = React.lazy(() => import("./components/authentication/MainAuth"));
const Courses = React.lazy(() => import("./components/courses/courses"));
const GetCourseDetails = React.lazy(() => import("./components/courses/getCourseDetaILS."));
const AboutCompany = React.lazy(() => import("./components/aboutCompany/aboutcompany"));
const InternshipOffers = React.lazy(() => import("./components/internships/internships"));
const JobNotifications = React.lazy(() => import("./components/jobNotifications/jobnotifications"));
const Trainers = React.lazy(() => import("./components/trainers/about_trainers"));
const Carousal = React.lazy(() => import("./components/caurosel"));
const BatchDetails = React.lazy(() => import("./components/newbacths/newbacths"));
const Services = React.lazy(() => import("./components/services/services"));
/* 🔐 Admin */
const AdminHome = React.lazy(() => import("./components/Admin/adminHome"));
const AllUsers = React.lazy(() => import("./components/Admin/allusers"));
const InternshipApplications = React.lazy(() => import("./components/Admin/InternshipApplications"));
const CourseEnrolledUsers = React.lazy(() => import("./components/Admin/CourseEnrolledUsers"));
const CreateInternship = React.lazy(() => import("./components/Admin/CreateInternship"));
const CourseWithSyllabusForm = React.lazy(() => import("./components/courses/create_course"));
const NewBatchForm = React.lazy(() => import("./components/Admin/create_new-batch"));
const JobNotificationForm = React.lazy(() => import("./components/Admin/createJobnotifiy"));

const Forbidden = React.lazy(() => import("./components/Routes/forbidden"));

/* 🔁 Loader Bridge */
const LoaderBridge = () => {
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    registerLoadingSetter(setLoading);
  }, [setLoading]);

  return loading ? <LoadingSpinner /> : null;
};

function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <NavbarProvider>
          <CourseProvider>

            <LoaderBridge />

            {/* 🌟 ONE Suspense for all routes */}
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>

                {/* 🌐 PUBLIC */}
                <Route path="/login" element={<Auth defaultForm="login" />} />
                <Route path="/signup" element={<Auth defaultForm="signup" />} />
                <Route path="/forgotpassword" element={<Auth defaultForm="forgotpassword" />} />
                <Route path="/403" element={<Forbidden />} />

                {/* 🔒 PROTECTED */}
                <Route path="/" element={<HomePage />} />
                  <Route path="/services" element={ 
                    <Services />
                  } />
                  <Route path="/carousal" element={
                    <Carousal />
                  } />  
                <Route path="/courses" element={
                  <Courses />
                } />

                <Route path="/course/:id" element={
                  <ProtectedRoute><GetCourseDetails /></ProtectedRoute>
                } />

                <Route path="/about" element={
                  <AboutCompany />
                } />

                <Route path="/internship" element={
                 <InternshipOffers />
                } />

                <Route path="/jobnotifications" element={
                  <JobNotifications />
                } />

                <Route path="/trainers" element={
                 <Trainers />
                } />

              

                <Route path="/newbacth" element={
                  <BatchDetails />
                } />

                {/* 🔐 ADMIN */}
                <Route path="/admin" element={
                  <AdminRoute><AdminHome /></AdminRoute>
                } />

                <Route path="/courses_create" element={
                  <AdminRoute><CourseWithSyllabusForm /></AdminRoute>
                } />

                <Route path="/admin/users" element={
                  <AdminRoute><AllUsers /></AdminRoute>
                } />

                <Route path="/admin/internship_applications" element={
                  <AdminRoute><InternshipApplications /></AdminRoute>
                } />

                <Route path="/admin/course_enrolled_users" element={
                  <AdminRoute><CourseEnrolledUsers /></AdminRoute>
                } />

                <Route path="/admin/create_internship" element={
                  <AdminRoute><CreateInternship /></AdminRoute>
                } />

                <Route path="/createnewbatch" element={
                  <AdminRoute><NewBatchForm /></AdminRoute>
                } />

                <Route path="/createjobnotification" element={
                  <AdminRoute><JobNotificationForm /></AdminRoute>
                } />

                {/* ❌ 404 */}
                <Route path="*" element={<div>404 Not Found</div>} />

              </Routes>
            </Suspense>

          </CourseProvider>
        </NavbarProvider>
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App;
