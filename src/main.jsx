import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from "./context/UserContext";


createRoot(document.getElementById('root')).render(
  <StrictMode>
<ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
      />
    <UserProvider>
       <App />
    </UserProvider>
    
    
  </StrictMode>,
)
