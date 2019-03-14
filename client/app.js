import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import UploadImage from './components/uploadImage'

const App = () => {
  return (
    <div>
      <Navbar />
      <UploadImage />
      <Routes />
    </div>
  )
}

export default App
