import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import ErrorPage from './components/commons/ErrorPage.tsx'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import Dashboard from './pages/Dashboard.tsx'
import DashboardRoot from './pages/DashboardRoot.tsx'
import RedeemedPoints from './pages/RedeemedPoints.tsx'
import Profile from './pages/Profile.tsx'

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  },
  {
    path: "/dashboard",
    element: <DashboardRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "redeemed-points",
        element: <RedeemedPoints />
      },
      {
        path: "profile",
        element: <Profile />
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
