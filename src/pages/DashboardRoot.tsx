import { Outlet } from "react-router-dom"
import Header from "../components/layouts/Header"

const DashboardRoot: React.FC = () => {
  return (
    <>
      <Header />
      <main className=" max-w-7xl mx-auto min-h-screen ">
        <Outlet />
      </main>
    </>
  )
}

export default DashboardRoot