import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router'
import VendorSignup from './auth/vendor-auth/vendor-signup/vendor-signup'
import vendorlogin from './auth/vendor-auth/vendor-login/vendor-login'
import Vendorlogin from './auth/vendor-auth/vendor-login/vendor-login'
const App = () => {
  return (
    <div>
     <RouterProvider router={router}/>
     {/* <VendorSignup/> */}
    
       {/* <Vendorlogin/> */}
    </div>
  )
}

export default App
