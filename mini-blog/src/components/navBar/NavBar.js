import styles from './NavBar.module.css'
import useAuthContext from '../../hooks/useAuthContext'
import {NavLink} from 'react-router-dom'
import useAuthentication from '../../hooks/useAuthentication'

function NavBar() {

  const {logout}=useAuthentication()
  const {user}=useAuthContext()

  return (
    <nav className={styles.navBar}>
        <NavLink to='/' className={styles.brand}>
            Mini <span>Blog</span>
        </NavLink>
        <ul className={styles.linkaList}>
            <li><NavLink className={({isActive})=>isActive ? (styles.active):(styles.disabled)} to='/'>Home</NavLink></li>
            <li><NavLink className={({isActive})=>isActive ? (styles.active):(styles.disabled)} to='/About'>Sobre</NavLink></li>
            {!user && (
              <>
                <li><NavLink className={({isActive})=>isActive ? (styles.active):(styles.disabled)} to='/Register'>Cadastrar</NavLink></li>
                <li><NavLink className={({isActive})=>isActive ? (styles.active):(styles.disabled)} to='/Login'>Entrar</NavLink></li>
              </>
            )}
            {user && (
              <>
                <li><NavLink className={({isActive})=>isActive ? (styles.active):(styles.disabled)} to='/Posts/Create'>Novo post</NavLink></li>
                <li><NavLink className={({isActive})=>isActive ? (styles.active):(styles.disabled)} to='/Dashboard'>Dashboard</NavLink></li>
                <li><button onClick={logout}>Sair</button></li>
              </>
            )}
        </ul>
    
    </nav>
  )
}

export default NavBar