import { Outlet, useNavigate } from "react-router-dom"
import Header from "../components/layouts/Header"
import { useEffect, useState } from "react"

const DashboardRoot: React.FC = () => {
  const [saveTestUser, setSaveTestUser] = useState(localStorage.getItem("test-token") || null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!saveTestUser) {
      navigate("/", { replace: true })
    }
  }, [setSaveTestUser])

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