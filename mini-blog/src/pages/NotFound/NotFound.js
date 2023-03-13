import { Link } from 'react-router-dom'
import Gear from '../../img/gear.png'
import styles from './NotFound.module.css'

function NotFound() {
  return (
    <div className={styles.NotFound}>
        <h1>Erro 404</h1>
        <img src={Gear} alt="gear" />
        <p>Página não encontrada, retorne para a página inicial <Link to='/'>Home</Link></p>
    </div>
  )
}

export default NotFound