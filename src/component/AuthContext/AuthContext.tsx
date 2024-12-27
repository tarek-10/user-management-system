import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useEffect, useState } from "react";

interface user{
    id:string,
    name:string,
    email:string,
    
}
interface AuthContextType{
    userData:user|null;
    saveData:()=>void
}
export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProviderProps{
    children:ReactNode;
}
export default function AuthContextProvider ({children}:AuthContextProviderProps){
    const [userData , setUserData] = useState<user|null>(null);
    const [currentUser,setCurrentUser] = useState();
    
    // Fetch user data from the API if not already in localStorage
 
    const saveData=()=>{
        const encodedToken = localStorage.getItem("userToken");
        const decodedToken = jwtDecode<user>(encodedToken);
        setUserData(decodedToken);
    }
    const getUser = async () => {
        try {
            console.log(userData?.id);
            
          const response = await axios.get(
            `https://dummyjson.com/user/${(userData?.id)?.toString()}`
          );
          const fetchedUser = response?.data;
          console.log(fetchedUser ,"eeeeeeeeee");
          
          setCurrentUser(fetchedUser);  
        } catch (error) {
          console.log("Error fetching user:", error);
        }
      };
  
    useEffect(()=>{
        if(localStorage.getItem("userToken")){
            saveData()
        }
    },[])
    useEffect(()=>{
        getUser();
    },[userData])
    return (
        <AuthContext.Provider value={{saveData , userData , currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

