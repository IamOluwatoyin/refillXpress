import React, {useContext} from 'react'
import { UserContext } from '../../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import "./LogoutModal.css"
const LogoutModal = ({cancel}) => {
      const { logout } = useContext(UserContext);
      const nav = useNavigate();
  return (
    <div className='logoutmodal'>
      <div className="logoutmodal-content">
        <span>Are you sure you want to logout?</span>   
        <div className="logoutmodal-actions">
          <button onClick={()=> {
            logout()
            nav("/")}
          } className='confirm-logout'>Logout</button>
          <button onClick={cancel} className='cancel-logout'>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal
