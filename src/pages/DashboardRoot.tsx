import { Outlet, useNavigate, useNavigation } from "react-router-dom"
import Header from "../components/layouts/Header"
import { useEffect, useState } from "react"
import Loading from "../components/commons/Loading"

const DashboardRoot: React.FC = () => {
  const [saveTestUser, setSaveTestUser] = useState(localStorage.getItem("test-token") || null)
  const navigate = useNavigate()
  const navigation = useNavigation()


  useEffect(() => {
    // if (!saveTestUser) {
    //   navigate("/", { replace: true })
    // }
  }, [saveTestUser, navigate, setSaveTestUser])

  return (
    <>
    {
      navigation.state == "loading" && <Loading title='Preparing PLACE-IT...' />
    }
      <Header />
      <main className=" max-w-7xl mx-auto min-h-screen ">
        <Outlet />
      </main>
    </>
  )
}

export default DashboardRoot