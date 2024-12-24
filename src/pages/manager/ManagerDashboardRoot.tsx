import { Outlet } from "react-router-dom"
import ManagerHeader from "../../components/layouts/manager_layouts/ManagerHeader"

const ManagerDashboardRoot: React.FC = () => {
  return (
    <>
      <ManagerHeader />
      <main className="px-52 mx-auto min-h-screen ">
        <Outlet />
      </main>
    </>
  )
}


export default ManagerDashboardRoot