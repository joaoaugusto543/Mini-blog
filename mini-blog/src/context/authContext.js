import { createContext, useState ,useEffect } from "react";
import {onAuthStateChanged} from 'firebase/auth'
import useAuthentication from '../hooks/useAuthentication'
import Loading from '../components/Loading/Loading'



export const authContext=createContext()

export default function AuthProvider({children}){
    

    const [user,setUser]=useState(undefined)
    const {auth}=useAuthentication()

    const loadingUser= user === undefined

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            setUser(user)
        })
    },[auth])

    if(loadingUser){
        return <Loading loading={loadingUser}/>
    }

    return(
        <authContext.Provider value={{user}} >
            {children}
        </authContext.Provider>
    )
}