import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router'
import VendorSignup from './auth/vendor-auth/vendor-signup/vendor-signup'
import vendorlogin from './auth/vendor-auth/vendor-login/vendor-login'
import Vendorlogin from './auth/vendor-auth/vendor-login/vendor-login'
import ViewOrderModal from './pages/feature/component/vendor-order-modals/view-order-modal'
import AcceptOrderModal from './pages/feature/component/vendor-order-modals/accept-order-modal'
import OrderDetails from './pages/feature/component/vendor-order-modals/order-details'
import RejectedOrder from './pages/feature/component/vendor-order-modals/rejected-order'
const App = () => {
  return (
    <div>
     <RouterProvider router={router}/>
     {/* <ViewOrderModal/>
     <AcceptOrderModal/> */}
     {/* <VendorSignup/> */}
     {/* <OrderDetails/> */}
    {/* <RejectedOrder/> */}
       {/* <Vendorlogin/> */}
    </div>
  )
}

export default App
