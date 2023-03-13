import {db} from '../firebase/config'
import {collection,addDoc,Timestamp} from 'firebase/firestore'
import { useEffect, useReducer, useState } from 'react'

const initialState={
    loading:null,
    error:null
}

function insertReducer(state,action){
    switch(action.type){
        case 'LOADING':
            return {loading:true,error:null}
        case 'INSERTED_DOC':
            return {loading:false,error:null}
        case 'ERROR':
            return {loading: false, error:action.payload}
        default:
            return state
    }

}

export const useInsertDocument=(docCollection)=>{

    const [response,dispatch]=useReducer(insertReducer,initialState)
    const [cancelled,setCancelled]=useState(true)


    function checkCancelBeforeDispatch(action){
        if(!cancelled){
            dispatch(action)
        }
    }

    async function insertDocument(document){

        checkCancelBeforeDispatch({
            type:'LOADING'
        })
    

        try {

            const newDocument={...document,createdAt:Timestamp.now()}

            const insertedDocument = await addDoc(
                collection(db,docCollection),
                newDocument
            )

            checkCancelBeforeDispatch({
                type:'INSERTED_DOC',
                payload: insertedDocument
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

    return {insertDocument,response}

}



