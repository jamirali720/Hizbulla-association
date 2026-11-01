import  { createContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';
const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const decoded = jwtDecode(localStorage.getItem('token'));
   
    return (
      <AuthContext.Provider value={decoded}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);