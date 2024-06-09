import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react"
import { getCurrentUser } from '../lib/appwrite'


const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        getCurrentUser().then((res) => {
            if (res) {
                setIsLoggedIn(true);
                setUser(res)
            }
            else {
                setIsLoggedIn(false);
                setUser(null);
            }
        })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [])
    return (
        <GlobalContext.Provider
            value={{
                setIsLoggedIn,
                isLoggedIn,
                isLoading,
                user, setUser, isLoading
            }}
        >
            {children}

        </GlobalContext.Provider>
    )
}