import { createContext, useState } from "react";
import { BASEURL } from "../api/base";
import axios from "axios";
import { toast } from "react-toastify";

export const UserContext =  createContext()
export const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

        const signup = async (e, FormData, confirm, nav) => {
                e.preventDefault()
                setLoading(true)
                if (!/\S+@\S+\.\S+/.test(FormData.email)) {
                toast.error("Please enter a valid email address.");    
                }
                if (confirm !== FormData.password) {
                    toast.error("password does not match")
                    return  
                }

            try {
                const res = await axios.post(`${BASEURL}/api/v1/user`, FormData, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                console.log(res.data)
               
                
                const userData = res.data.data
                setUser(userData)
                localStorage.setItem("user", JSON.stringify(userData))
                console.log(userData)

                toast.success(res.data.message)
                nav("/userverify")
            } catch (err) {
                toast.error(err.response.data.message)
                console.log(err)
                console.log(user)

            } finally {
                setLoading(false)
            }
        }

        
        

    const login = async (e, credentials, navigate) => {
                e.preventDefault()
                if (!credentials.email) {
                toast.error("Please enter a valid email address."); 
                return   
                }
                if (!credentials.password) {
                    toast.error("Enter your password")
                    return  
                }
        try {
            const res = await axios.post(`${BASEURL}/api/v1/user/login`, credentials, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const token = res.data.token
            const userData = res.data.data
            setUser(userData)   
            setToken(token);
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", token);
            navigate("/userdashboard")
            
        } catch(err) {
            console.error(err.message)
            throw err
        }
        }
        const logout = () => {  
            setUser(null)
            setToken(null)
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        }
    
    
    return (
        <UserContext.Provider value={{user, setUser, signup, login, token, logout, loading, setLoading}}>
            {children}
        </UserContext.Provider>
    )
}