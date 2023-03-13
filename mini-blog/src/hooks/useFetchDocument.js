import { useEffect, useState } from 'react'
import {db} from '../firebase/config'
import { doc,getDoc } from 'firebase/firestore'

export default function useFetchDocument(docCollection,id){
  
    const [document,setDocument]=useState(null)
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(false) 

    const [cancelled,setCancelled]=useState(true)

    useEffect(()=>{

        async function loadDocument(){
            if (!cancelled) {
                return;
              }
        
              setLoading(true);

              try {

                const docRef = await doc(db, docCollection, id);
                const docSnap = await getDoc(docRef);
                setDocument(docSnap.data());
                
              } catch (error) {
                console.log(error.message)
                setError(error.message)
              }

              setLoading(false)
        }

        loadDocument()

    },[docCollection,id,cancelled])

    useEffect(()=>{
        return ()=>setCancelled(true)
    },[])

    return {document,error,loading}

}