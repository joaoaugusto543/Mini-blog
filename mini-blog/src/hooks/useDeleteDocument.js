import {db} from '../firebase/config'
import {doc,deleteDoc} from 'firebase/firestore'
import { useEffect, useReducer, useState } from 'react'

const initialState={
    loading:null,
    error:null
}

function DeleteReducer(state,action){
    switch(action.type){
        case 'LOADING':
            return {loading:true,error:null}
        case 'DELETE_DOC':
            return {loading:false,error:null}
        case 'ERROR':
            return {loading: false, error:action.payload}
        default:
            return state
    }

}

export const useDeleteDocument=(docCollection)=>{

    const [response,dispatch]=useReducer(DeleteReducer,initialState)
    const [cancelled,setCancelled]=useState(true)


    function checkCancelBeforeDispatch(action){
        if(!cancelled){
            dispatch(action)
        }
    }

    async function deleteDocument(id){

        checkCancelBeforeDispatch({
            type:'LOADING'
        })
    

        try {

            const deletedDocument=await deleteDoc(doc(db,docCollection,id))

            checkCancelBeforeDispatch({
                type:'DELETE_DOC',
                payload: deletedDocument
            })
            
        } catch (error) {
            checkCancelBeforeDispatch({
                type:'ERROR',
                payload: 'Ocorreu um erro, tente mais tarde.'
            })
        }

    }

    useEffect(() => {
        return () => setCancelled(false);
      }, []);

    return {deleteDocument,response}

}



