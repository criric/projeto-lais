import AsideLayout from '../../layouts/asidelayouts/AsideLayouts'
import style from './Login.module.css'
import { useState } from 'react'
import Api from '../../services/Api'
import { toast } from 'react-toastify'
function Login() {
  const [index, setIndex] = useState(0)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const postUser = async () => {
    try {
      const response = await Api.axios.post('/users', {
        email,
        nome: name,
        password
      })
      if (response) {
        toast.success('Usuário cadastrado com sucesso')
      }
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  const steps = [
    <div className={style.loginContainer}>
      <p>Preencha os campos abaixo</p>
      <div className={style.input}>
        <label for="email">Email</label>
        <input type="text" id="email" value={''} />
      </div>

      <div className={style.input}>
        <label for="password">Senha</label>
        <input type="password" id="password" value={''} />
      </div>
      <p>Esqueceu sua senha?</p>
      <button
        disabled={
          !loginEmail?.match(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/) ||
          !loginPassword
        }
      >
        Entrar
      </button>
    </div>,

    <div className={style.loginContainer}>
      <h4>Preencha os campos abaixo</h4>
      <p>É rápido, simples e seguro</p>
      <div className={style.input}>
        <label for="email">Email</label>
        <input
          type="text"
          id="email"
          onChange={event => {
            setEmail(event.target.value)
          }}
        />
      </div>
      <button
        onClick={() => {
          setIndex(2)
        }}
        disabled={!email.match(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/)}
      >
        Continuar
      </button>
    </div>,

    <div className={style.loginContainer}>
      <p>Preencha os campos abaixo</p>
      <div className={style.input}>
        <label for="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={event => {
            setEmail(event.target.value)
          }}
        />
      </div>

      <div className={style.input}>
        <label for="nome">Nome</label>
        <input
          type="text"
          id="nome"
          value={name}
          onChange={event => {
            setName(event.target.value)
          }}
        />
      </div>

      <div className={style.input}>
        <label for="password">Senha</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={event => {
            setPassword(event.target.value)
          }}
        />
      </div>

      <div className={style.input}>
        <label for="confirmPassword">Confirmação de senha</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={event => {
            setConfirmPassword(event.target.value)
          }}
        />
      </div>
      <button
        disabled={
          password != confirmPassword ||
          !email.match(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/) ||
          !password ||
          !name
        }
        onClick={postUser}
      >
        Continuar
      </button>
    </div>
  ]
  return (
    <AsideLayout>
      <div className={style.container}>
        <div className={style.stateContainer}>
          <p>{index === 0 ? 'Não tem uma conta?' : 'Já tem conta?'}</p>
          <button
            onClick={() => {
              setIndex(index === 0 ? 1 : 0)
            }}
          >
            {index === 0 ? 'Criar uma' : 'Entrar'}
          </button>
        </div>
        {steps[index]}
      </div>
    </AsideLayout>
  )
}

export default Login
