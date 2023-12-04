import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { login } from "../services/auth.services";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const signup = async (data) => {
    try {
      // const result = await registerRequest(data);
      // if (result.status === 200) {
      //   setIsAuthenticated(true);
      //   setUser(result.data);
      //   setErrors([]);
      // }
    } catch (error) {
      // setErrors(error.response.data.error);
      // console.log(error);
    }
  };

  const signin = async (data) => {
    try {
      const result = await login(data);
      if (result.status === 200) {
        setIsAuthenticated(true);
        setUser(result.data.userData);
        setLoading(false);
        localStorage.setItem("token", result.data.token)
      }
    } catch (error) {
      // setErrors(error.response.data.message ? [error.response.data.message] : [error.response.data.error]);
      console.log(error);
    }
  };

  const logout = async () => {
    // await logoutRequest();
    // setErrors([]);
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);
    localStorage.removeItem("token")
  };

  const update = async (data, userId) => {
    // try {
    //   const result = await updateRequest(data, userId);
    //   if (result.status === 200) {
    //     setUser(result.data);
    //     console.log(result);
    //   }
    // } catch (error) {
    //   console.error(error)
    // }
  };

  useEffect(() => {
    const checkLogin = async () => {
      
      // const cookie = Cookies.get("token");

      const token = localStorage.getItem("token");

      Cookies.set("token", token)

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        setUser();
        return;
      }

      setIsAuthenticated(true);
      setLoading(false);

      // try {
      //   const res = await verifyTokenRequest();

      //   if (!res.data) return setIsAuthenticated(false);
      //   setIsAuthenticated(true);
      //   setUser(res.data);
      //   setLoading(false);

      // } catch (error) {
      //   setIsAuthenticated(false);
      //   setLoading(false);
      //   setUser(null);
      // }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        isAuthenticated,
        setIsAuthenticated,
        signup,
        signin,
        logout,
        update,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
