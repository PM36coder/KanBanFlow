import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Snowfall from "react-snowfall";
import { useDispatch } from "react-redux";
import { loadUser } from "./store/slice/authSlice";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Projects } from "./pages/Projects";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Service } from "./pages/Service";
import { Board } from "./pages/Board";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { useEffect, useState } from "react";
import { Error } from "./pages/Error";
import { UpdatePassword } from "./components/UpdatePassword";
import { ForgotPassword } from "./components/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "projects", element: <Projects /> },
      { path: "services", element: <Service /> },
      {
        path: "update-password",
        element: (
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Board />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        await dispatch(loadUser());
      }
      setIsAuthChecked(true);
    };
    initApp();
  }, [dispatch]);

  if (!isAuthChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1115]">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* BASE DARK BACKGROUND */}
      <div className="fixed inset-0 -z-30 bg-[#0f1115]" />

      {/* SOFT HIGHLIGHTS */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        {/* Top soft light */}
        <div className="absolute top-0 left-0 right-0 h-[35%] bg-linear-to-b from-white/5 to-transparent" />

        {/* Center ambient highlight */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 40% at 50% 35%, rgba(255,255,255,0.04), transparent 70%)",
          }}
        />

        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-linear-to-t from-black/45 to-transparent" />
      </div>

      {/* SNOW ANIMATION */}
      <Snowfall
        snowflakeCount={140}
        color="rgba(220,230,255,0.85)"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          pointerEvents: "none",
        }}
      />

      {/* APP CONTENT */}
      <div className="relative z-10">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
