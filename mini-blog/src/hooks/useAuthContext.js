import { useContext } from "react";
import { authContext } from "../context/authContext";

function useAuthContext(){
    const context=useContext(authContext)

    return context

}


export default useAuthContext