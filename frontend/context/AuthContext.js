import { createContext, useState, useEffect, useContext, Children } from "react";

const authContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            const decoded = jwtDecode(token)
        }
    })

}