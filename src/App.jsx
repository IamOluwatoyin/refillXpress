import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router'
import VendorSignup from './auth/vendor-auth/vendor-signup/vendor-signup'
const App = () => {
  return (
    <div>
     {/* <RouterProvider router={router}/> */}
     <VendorSignup/>
      
    </div>
  )
}

export default App
