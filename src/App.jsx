import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router'
import vendorlogin from './auth/vendor-auth/vendor-login/vendor-login'
import Vendorlogin from './auth/vendor-auth/vendor-login/vendor-login'
import Forgot from './Auth/Forgot'




const App = () => {
  return (
     <div>
     <RouterProvider router={router}/>
    </div>
  )
}

export default App
