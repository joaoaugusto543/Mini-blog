import styles from './CreatePost.module.css'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import useAuthContext from '../../hooks/useAuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

function CreatePost() {

  const [title,setTitle]=useState('')
  const [img,setImg]=useState('')
  const [body,setBody]=useState('')
  const [tags,setTags]=useState('')
  const [errorForm,setErrorForm]=useState('')

  const {user}=useAuthContext()

  const navigate=useNavigate()

  const {insertDocument,response}=useInsertDocument('posts')

  function handleSubmit(e){
    e.preventDefault()
    setErrorForm('')

    try {
      new URL(img)
    } catch (error) {
      return setErrorForm('A imagem precisa ser uma URL.')
    }

    const arrayTags=tags.split(',').map((tag)=>tag.split(' ').join('').toLocaleLowerCase())

    if(!tags || !title || !img || !body){
      return setErrorForm('Por favor,preencha todos os campos.')
    }

    let bodyInvalid=false

    body.split(' ').map((frase)=>{
      if(frase.length>=143 && !bodyInvalid){
        return bodyInvalid=true
      }
      return false
    })


    if(bodyInvalid){
      return setErrorForm('Descrição muito grande')
    }

    if(title.length>35){
      return setErrorForm('Título muito grande.')
    }

    if(response.error){
      return setErrorForm(response.error)
    }

    insertDocument({
      title,
      img,
      body,
      tags:arrayTags,
      uid:user.uid,
      createdBy:user.displayName
    })

    setTags('')
    setImg('')
    setBody('')
    setTitle('')

    navigate('/')

  }

  return (
    <div className={styles.createPost}>
        <h1>Criar post</h1>
        <p>Escreva sobre o que quiser e compartilhe o seu conhecimento</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Título:</span> 
                <input type="text" name="title" required placeholder='Pense num bom título...' value={title} onChange={e=>setTitle(e.target.value)}/>
            </label>
            <label>
                <span>URL da imagem:</span> 
                <input type="text" name="img" required placeholder='Insira um imagem que representa o seu post' value={img} onChange={e=>setImg(e.target.value)}/>
            </label>
            <label>
                <span>Conteúdo:</span>
                <textarea className={styles.textArea} name="body" required placeholder='Insira o conteúdo do post' value={body} onChange={e=>setBody(e.target.value)}></textarea>
            </label>
            <label>
                <span>Tags:</span>
                <input type="text" name="tags" required placeholder='Insira as tags separadas por vírgula' value={tags} onChange={e=>setTags(e.target.value)}/>
            </label>
            {!response.loading ? (<button className='btn'>Criar</button>):(<button className='btn' disabled>Aguarde...</button>)}
            {errorForm && <p className="error">{errorForm}</p> }
        </form>
    </div>
  )
}

export default CreatePost