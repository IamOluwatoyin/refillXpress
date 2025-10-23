import React, { useState } from 'react'
import SpinnerModal from '../../auth/vendor-auth/spinner-modal-auth'

const VendorDashboard = () => {
   const[showModal, setShowModal] = useState(false)
  return (
    <>
    {showModal ? (<SpinnerModal/>) : (
      <div>
      welcome!
    </div>
    )}
   
    </>
    
  )
}

export default VendorDashboard
