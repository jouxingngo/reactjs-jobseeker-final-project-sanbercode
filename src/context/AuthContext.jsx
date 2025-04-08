import axios from "axios";
import { createContext, useState, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [errorAuth, setErrorAuth] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!Cookies.get("token")
  );
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://final-project-api-alpha.vercel.app/api/auth/login",
        { email, password }
      );
      let data = response.data;
      Cookies.set("token", data.token, { expires: 1 });
      setIsAuthenticated(true); // Set authenticated status to true
      navigate("/admin/dashboard");
      console.log(response.data);
    } catch (error) {
      setErrorAuth("Login gagal. Email atau Password Salah!");
      console.log(`Login Gagal, ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("token"); // Menghapus token saat logout
    setIsAuthenticated(false); // Set authenticated status to false
    navigate("/admin/login"); // Redirect ke halaman login setelah logout
  };

  return (
    <AuthContext.Provider
      value={{ loading, login, logout, errorAuth, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
