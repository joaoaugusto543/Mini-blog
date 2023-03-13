import { createUserWithEmailAndPassword, getAuth, updateProfile,signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from 'react'
import {db} from '../firebase/config'

export default function useAuthentication(){
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(null)
    const [cancelled,setCancelled]=useState(false)

    const auth=getAuth()

    function checkIfIsCancelled(){
        if(cancelled){
            return;
        }
    }

    async function createUser(data){
        checkIfIsCancelled()
        setError('')
        setLoading(true)

        try {

            const {user}=await createUserWithEmailAndPassword(auth,data.email,data.password)

            await updateProfile(user,{
                displayName:data.displayName
            })

            setLoading(false)
            return user
        
        } catch (error) {
            let systemErrorMessage

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado.";
            }else if (error.message.includes("invalid-email")) {
                systemErrorMessage = "E-mail inválido.";
            }else {
                systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
            }
            setError(systemErrorMessage)
            setLoading(false)
        }
            
        }

        function logout(){
            checkIfIsCancelled()
            signOut(auth)
            
        }

        async function login(data){

            checkIfIsCancelled()
            setLoading(true)
            setError(false)

            try {

                await signInWithEmailAndPassword(auth,data.email,data.password)
                
            } catch (error) {

                let systemErrorMessage

                if(error.message.includes('user-not-found')){
                    systemErrorMessage='Usuário não encontrado'
                }else if(error.message.includes('wrong-password')){
                    systemErrorMessage='Senha ou usuário incorreto'
                }else{
                    systemErrorMessage='Ocorreu um erro, tente mais tarde.'
                }

                setError(systemErrorMessage)
               console.log(error.message)
            }

            setLoading(false)

        }
        
        useEffect(()=>{
            return ()=>setCancelled(true)
        },[])

        
        return({
            auth,
            createUser,
            error,
            loading,
            logout,
            login
        }
        )
}