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




function App() {

const dispatch = useDispatch()

useEffect(()=>{
  
  dispatch(loadUser());
},[dispatch])




  const router = createBrowserRouter([
    {
      path:'/' , element:<Layout/>,
      errorElement: <h1>Error Page</h1>,
      children : [
        {path : "" , element:<Home/>},
        {path:"about", element:<About/>},
        {path:"contact", element:<Contact/>},
        {path:"projects", element:<Projects/>},
        {path:"services" , element:<Service/>},

        //protect routes
        {path:"dashboard" , element:(<ProtectedRoute>
          <Board/>
        </ProtectedRoute>)},

        //auth pages
           { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      ]
    }
  ])



  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
