import { createContext, useState } from "react";
import { useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  // Inside AuthContext.js
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  let initialUser;
  if (token && typeof token === "string" && token.split(".").length === 3) {
    try {
      const decoded = jwtDecode(token);

      // Check if the token has expired
      // eslint-disable-next-line react-hooks/purity
      const currentTime = Date.now() / 1000;
      if (decoded.exp > currentTime) {
        initialUser = decoded;
      } else {
        localStorage.removeItem("token"); // Clean up expired token
      }
    } catch (error) {
      console.error("Corrupt token found, clearing storage:", error);
      localStorage.removeItem("token");
    }
  }

  const login = (newToken) => {
    localStorage.setItem("token", newToken);

    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("You have successfully logged out");
  };

  return (
    <AuthContext.Provider value={{ token, initialUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
