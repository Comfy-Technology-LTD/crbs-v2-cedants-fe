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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext.tsx'
import ManagerDashboardRoot from './pages/manager/ManagerDashboardRoot.tsx'
import ManagerAuth from './pages/manager/ManagerAuth.tsx'
import OfferDashboard from './pages/manager/OfferDashboard.tsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
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
  {
    path: "/manager-dashboard",
    element: <ManagerDashboardRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <ManagerAuth />
      },
      {
        path: "offers-dashboard",
        element: <OfferDashboard />
      },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
