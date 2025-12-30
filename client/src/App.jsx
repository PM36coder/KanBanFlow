import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loadUser } from "./store/slice/authSlice"
import { Layout } from "./components/Layout"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Contact } from "./pages/Contact"
import { Projects } from "./pages/Projects"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Service } from "./pages/Service"
import { Board } from "./pages/Board"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import { useEffect } from "react"
import { Error } from "./pages/Error"
import { UpdatePassword } from "./components/UpdatePassword"
import { ForgotPassword } from "./components/ForgotPassword"


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "projects", element: <Projects /> },
      { path: "services", element: <Service /> },

      // Protected routes
      {
        path: "update-password",
        element: (
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        )
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Board />
          </ProtectedRoute>
        )
      },

      // Auth pages
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {path: "forgot-password" , element : <ForgotPassword/>}
    ]
  }
])

function App() {
  const dispatch = useDispatch()
  

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
   if (isLoggedIn === "true") {
       dispatch(loadUser());
    }
   
  }, [dispatch])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App