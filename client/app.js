import React from 'react'
import {Navbar, Hamburger} from './components'
import Routes from './routes'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const App = () => {
  return (
    <div>
      <Navbar />
      <Hamburger />
      <Routes />
      <ToastContainer
        className="toasty"
        position="top-right"
        autoClose={1500}
      />
    </div>
  )
}

export default App
