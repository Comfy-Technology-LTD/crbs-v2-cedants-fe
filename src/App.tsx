import Header from './components/layouts/Header'
import { BACKGROUNDIMAGE } from './constants'
import { Outlet } from "react-router-dom"

function App() {

  return (
    <>
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
