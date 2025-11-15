import { createContext, useEffect, useState } from "react";
import { BASEURL } from "../api/base";
import axios from "axios";
import { toast } from "react-toastify";
import { signInUser, signUpUser } from "../api/mutation";
import { useNavigate } from "react-router";
import Signup from "../Auth/customer-auth/customer-signup/Signup";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
 
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [userDetail, setUserDetail] = useState(null);




const signup = async (data) => {
  setLoading(true);
  const { confirmPassword, check, ...payload } = data;

  try {
    const res = await signUpUser(payload);
    localStorage.setItem("email", data.email);
    toast.success(res.data.message);
    console.log("success", res.data);

   
    return true;
  } catch (err) {
    console.log("error", err);
    toast.error(err.response?.data?.message || "Something went wrong");
    return false;
  } finally {
    setLoading(false);
  }
};


  const login = async (data) => {
     setLoading(true);
    

    try {
      
      const res = await signInUser(data)
      console.log("login",res)

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.data.id);
      localStorage.setItem("userInfo", JSON.stringify(res.data.data));
    
    // localStorage.setItem("role", "user");  

      

      toast.success("Login successful!");
       return true; 
     
    } catch (err) {
        console.log("error", err);
      toast.error(err?.response?.data?.message || "Something went wrong!");
        return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userDetail,
        signup,
        login,
        token,
        logout,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
