import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from "./context/UserContext";
import { LoadingProvider } from "./context/LoadingContext";


createRoot(document.getElementById('root')).render(
  <StrictMode>
<ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
      />
    <UserProvider>
       <LoadingProvider>
        <App />
      </LoadingProvider>
    </UserProvider>
    
    
  </StrictMode>,
)
