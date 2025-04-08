import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage/landingPage";
import AdminDashboard from "./pages/AdminDashboard/adminDashboard";
import LoginPage from "./pages/LoginPage/loginPage";
import RegisterPage from "./pages/RegisterPage/registerPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/Auth/protectedRoute";
import Navbar from "./components/Template/navbar";
import AdminProfile from "./pages/AdminProfile/profile";
import ListJob from "./pages/AdminDashboard/listJob";
import ListJobCreate from "./pages/AdminDashboard/listJobCreate";
import DetailJob from "./pages/DetailJob/detailJob";
import ListJobEdit from "./pages/AdminDashboard/listJobEdit";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/admin/register" element={<RegisterPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard/profile"
            element={
              <ProtectedRoute>
                <AdminProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/list-job-vacancy"
            element={
              <ProtectedRoute>
                <ListJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/list-job-vacancy/form/"
            element={
              <ProtectedRoute>
                <ListJobCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-job-vacancy/edit/:id"
            element={
              <ProtectedRoute>
                <ListJobEdit />
              </ProtectedRoute>
            }
          />
          <Route path="/list-job-vacancy/form/:id" element={<DetailJob />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
