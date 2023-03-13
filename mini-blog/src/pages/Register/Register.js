import styles from './Register.module.css'
import {useEffect, useState} from 'react'
import useAuthentication from '../../hooks/useAuthentication'

function Register() {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error,setError]=useState('')

    const {createUser,error:authError,loading}=useAuthentication()
    
    useEffect(()=>{
        if(authError){
            setError(authError)
        }
    },[authError])


    async function handleSubmit(e){
        e.preventDefault()
    
        if(password!==confirmPassword){
            setError('As senha precisam ser iguais!')
            return
        }

        if(!displayName || !email || !password || !confirmPassword){
            setError('Por favor,preencha todos os campos.')
            return
        }

        const user={
            displayName,
            email,
            password
        }
        
        await createUser(user)

        setError('')

    }

  return (
    <div className={styles.register}>
        <h1>Cadastre-se para postar</h1>
        <p>Crie seu usuário e compartilhe suas histórias</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Nome:</span> 
                <input type="text" name="displayName" required placeholder='Nome do usuário' value={displayName} onChange={e=>setDisplayName(e.target.value)}/>
            </label>
            <label>
                <span>E-email:</span> 
                <input type="email" name="email" required placeholder='E-mail do usuário' value={email} onChange={e=>setEmail(e.target.value)}/>
            </label>
            <label>
                <span>Senha:</span>
                <input type="password" name="password" required placeholder='Insira sua senha' value={password} onChange={e=>setPassword(e.target.value)}/>
            </label>
            <label>
                <span>Confirme sua senha:</span>
                <input type="password" name="ConfirmPassword" required placeholder='Confirme sua senha' value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>
            </label>
            {!loading ? (<button className='btn'>Cadastrar</button>):(<button className='btn' disabled>Aguarde...</button>)}
            {error && <p className="error">{error}</p> }
        </form>
    </div>
  )
}

export default Register