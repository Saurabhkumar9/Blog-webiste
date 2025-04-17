import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const BASE_API_URL = import.meta.env.VITE_API_URL;
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
    setToken(token);
    setIsLogin(true);
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

  const getUser = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/user/show/profile`, {
        headers: {
          Authorization: `Bearer ${sendToken}`,
        },
      });

      if (response.data.success) {
        setIconUrl(response.data.user.avatar);
      }
    } catch (error) {
      // toast.error(error.response?.data?.message || "Failed to fetch user data");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const sendToken = localStorage.getItem("token");

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
        sendToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
