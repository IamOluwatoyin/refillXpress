import { createContext, useEffect, useState } from "react";
import { BASEURL } from "../api/base";
import axios from "axios";
import { toast } from "react-toastify";

export const UserContext =  createContext()
export const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [allUsers, setAllUsers] = useState([])
    const [userDetail, setUserDetail] = useState(null)

        console.log(allUsers)

    useEffect(()=> {
                const getUsers = async () => {
                    try {
                        const res = await axios.get(`${BASEURL}/api/v1/user/getAllusers`)
                        const response = res.data.data
                        setAllUsers(response)
                    } catch (err) {
                        null
                    }
                }
                getUsers()
            }, [])

            const checkVerified = allUsers.find(all => all.isVerified === false)
            console.log(checkVerified)

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
                if(checkVerified && checkVerified.email === FormData.email) {
                    nav("/userverify")
                } 
                toast.error(err.response.data.message)
                console.log(err.response.data.message)

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
                const details = allUsers.filter(all => all.isVerified === true).find(info => info.email === credentials.email)
                localStorage.setItem("userInfo", JSON.stringify(details))
        try {
            setLoading(true)
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
            setUserDetail(details)
            console.log(userDetail)
            navigate("/userdashboard")
            
        } catch(err) {
            toast.error(err.response.data.message)
        } finally {
            setLoading(false)   
        }
        }
        const logout = () => {  
            setUser(null)
            setToken(null)
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        }
    
    
    return (
        <UserContext.Provider value={{user, setUser, userDetail, signup, login, token, logout, loading, setLoading}}>
            {children}
        </UserContext.Provider>
    )
}