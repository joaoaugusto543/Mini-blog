import { useEffect, useState } from 'react'
import useAuthentication from '../../hooks/useAuthentication'
import styles from './Login.module.css'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error,setError]=useState('')

  const {error:authError,loading,login}=useAuthentication()
    
  useEffect(()=>{
      if(authError){
          setError(authError)
      }
  },[authError])

  async function handleSubmit(e){
    e.preventDefault()

    const user={
      email,
      password
    }

    await login(user)

  }
  
  return (
    <div className={styles.login}>
        <h1>Entrar</h1>
        <p>Faça o login para poder utilizar o sistema</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>E-email:</span> 
                <input type="email" name="email" required placeholder='E-mail do usuário' value={email} onChange={e=>setEmail(e.target.value)}/>
            </label>
            <label>
                <span>Senha:</span>
                <input type="password" name="password" required placeholder='Insira sua senha' value={password} onChange={e=>setPassword(e.target.value)}/>
            </label>
            {!loading ? (<button className='btn'>Entrar</button>):(<button className='btn' disabled>Aguarde...</button>)}
            {error && <p className="error">{error}</p> }
        </form>
    </div>
  )
}

export default Login