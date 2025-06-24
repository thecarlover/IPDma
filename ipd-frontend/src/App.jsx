import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import {
  SignIn,
  SignUp,
  UserButton,
  useUser,
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

import { useEffect } from "react";
import { Toaster } from 'react-hot-toast';

import AdminDashboard from "./pages/AdminDashboard.jsx";
import ReceptionDashboard from "./pages/ReceptionDashboard.jsx";
import PatientDetailDashboard from "./pages/PatientDetailDashboard.jsx"; 

// 🔒 Role-Based Protected Route
function ProtectedRoute({ role, children }) {
  const { user } = useUser();

  const userRole = user?.publicMetadata?.role;

  if (!user) return <Navigate to="/sign-in" />;
  if (userRole !== role) return <Navigate to="/" />;

  return children;
}

// 🔁 Redirect to dashboard after login based on role
// function RoleRedirector() {
//   const { user } = useUser();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) return;
//     const role = user.publicMetadata?.role;

//     if (role === "admin") navigate("/admin/dashboard");
//     else if (role === "receptionist") navigate("/reception/dashboard");
//   }, [user, navigate]);

//   return null;
// }

import { useLocation } from "react-router-dom";

function RoleRedirector() {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user || location.pathname !== "/") return; // ✅ Only redirect from homepage

    const role = user.publicMetadata?.role;

    if (role === "admin") navigate("/admin/dashboard");
    else if (role === "receptionist") navigate("/reception/dashboard");
  }, [user, navigate, location]);

  return null;
}

export default function App() {
  return (
    <div className="p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <ClerkLoading>Loading...</ClerkLoading>
      <ClerkLoaded>
        <RoleRedirector />
        <Routes>
          <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" afterSignInUrl="/" />} />
          <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" afterSignInUrl="/" />} />

          {/* 🧑‍💼 Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/patient/:id"
            element={
              <ProtectedRoute role="admin">
                <PatientDetailDashboard />
              </ProtectedRoute>
            }
          />

          {/* 💁 Receptionist Routes */}
          <Route
            path="/reception/dashboard"
            element={
              <ProtectedRoute role="receptionist">
                <ReceptionDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Home />} />
        </Routes>
      </ClerkLoaded>
    </div>
  );
}

// 🏠 Home Page
function Home() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold">Welcome to IPD App</h1>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <a href="/sign-in" className="text-blue-600 underline">
          Sign in
        </a>
      </SignedOut>
    </div>
  );
}
