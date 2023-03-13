import PostDetail from '../../components/PostDetail/PostDetail'
import useFetchDocuments from '../../hooks/useFetchDocuments'
import useQuery from '../../hooks/useQuery'
import styles from './Search.module.css'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loading/Loading'

function Search() {

    const query=useQuery()

    const search=query.get('q')

    const {documents:posts,loading}=useFetchDocuments('posts',search)

    if(loading){
      return <Loader/>
    }

  return (
    <div className={styles.search_container}>
        <h2>Search</h2>
        {posts && posts.length === 0 && (
          <>
            <p>Não foram encontrados posts a partir da sua busca...</p>
            <Link to="/" className="btn btn-dark">
              Voltar
            </Link>
          </>
        )}
        {posts && posts.map((post,index)=>(
            <PostDetail key={index} post={post}/>
        ))}
    </div>
  )
}

export default Search