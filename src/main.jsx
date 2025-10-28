import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ToastContainer  autoClose={3000} />
     <UserProvider>
      <App />
     </UserProvider>
  </StrictMode>,
)
