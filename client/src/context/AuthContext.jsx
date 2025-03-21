import { createContext, useContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [iconUrl, setIconUrl] = useState("");
  const [token, setToken] = useState("");


  // Check localStorage for token on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLogin(true);
      setToken(storedToken);
      
    }
  }, []);


  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLogin(true);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    setToken("");
    setIconUrl("");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };


 
  const sendToken=localStorage.getItem('token')
  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        iconUrl,
        setIconUrl,
        token,
        login,
        logout,
        sendToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

