import Loading from './components/commons/Loading'
import Header from './components/layouts/Header'
import { BACKGROUNDIMAGE } from './constants'
import { Outlet } from "react-router-dom"
import { useNavigation } from 'react-router-dom'

function App() {

  const navigation = useNavigation()

  return (
    <>
      {
        navigation.state == "loading" && <Loading title='Preparing PLACE-IT...' />
      }
      <Header />
      <main style={{
        backgroundImage: `url(${BACKGROUNDIMAGE})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }} className='min-h-screen flex justify-center items-center'>
        <Outlet />
      </main>
    </>
  )
}

export default App
