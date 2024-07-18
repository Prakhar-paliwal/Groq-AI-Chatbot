import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
// import Signup from '../pages/Signup';
import { checkAuthStatus, loginUser, logoutUser, signUpUser } from './helpers/api-communicator';

//creating the context
const AuthContext = createContext(null);

//AuthProvider will wrap all the children nodes inside it
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        //fetch if the user's cookies are valid then skip login
        //created a request in backend to verify the token for signed in user so that they do not need to sign in again

        async function checkStatus(){
            const data = await checkAuthStatus();
            
            if(data){
                setUser({ email: data.email, name: data.name });
                setIsLoggedIn(true);
            }
        }
        checkStatus();
    }, []);

    //defining the functions for login signup and logout
    const login = async (email, password) => {
        const data = await loginUser(email, password);
        if (data) {
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
        }
    };
    const signup = async (name, email, password) => {
        const data = await signUpUser(name, email, password);
        if (data) {
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
        }
    };
    const logout = async () => { 
        await logoutUser();
        setIsLoggedIn(false);
        setUser(null);
        window.location.reload();
    };

    const value = {
        user, isLoggedIn, login, logout, signup
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);
