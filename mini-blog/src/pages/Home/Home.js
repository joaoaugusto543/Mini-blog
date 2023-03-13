import { useState } from 'react'
import styles from './Home.module.css'
import {Link, useNavigate} from 'react-router-dom'
import useFetchDocuments from '../../hooks/useFetchDocuments'
import PostDetail from '../../components/PostDetail/PostDetail'
import Loading from '../../components/Loading/Loading'
import useAuthentication from '../../hooks/useAuthentication'

function Home() {

  const [query,setQuery]=useState(null)
  const {documents:posts}=useFetchDocuments('posts')
  const {loading}=useAuthentication()
  const navigate=useNavigate()

  if(loading){
    return <Loading/>
  }
  
  function handleSubmit(e){
    e.preventDefault()
    if(query){
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form className={styles.search_form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      {posts && posts.map((post,index)=>(
        <PostDetail key={index} post={post}/>
      ))}
      {!posts && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
    </div>
  )
}

export default Home