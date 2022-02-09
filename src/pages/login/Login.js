import AsideLayout from '../../layouts/asidelayouts/AsideLayouts'
import style from './Login.module.css'
import { useState, useContext, useEffect } from 'react'
import Api from '../../services/Api'
import { toast } from 'react-toastify'
import { Context } from '../../contexts/userContext'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [index, setIndex] = useState(0)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [modal, setModal] = useState(false)

  const { user, setUser } = useContext(Context)
  const navigate = useNavigate()

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

  const login = async () => {
    try {
      const response = await Api.axios.post('/login', {
        email: loginEmail,
        password: loginPassword
      })
      if (response.data) {
        localStorage.setItem('token', response.data.accessToken)
        setUser(response.data.user)
        navigate('/user')
      }
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  const token = localStorage.getItem('token')
  useEffect(() => {
    if (user && token) navigate('/user')
  }, [user, token])

  const steps = [
    <div className={style.loginContainer}>
      <p>Preencha os campos abaixo</p>
      <div className={style.input}>
        <label for="email">Email</label>
        <input
          type="text"
          id="email"
          value={loginEmail}
          onChange={event => {
            setLoginEmail(event.target.value)
          }}
        />
      </div>

      <div className={style.input}>
        <label for="password">Senha</label>
        <input
          type="password"
          id="password"
          value={loginPassword}
          onChange={event => {
            setLoginPassword(event.target.value)
          }}
        />
      </div>
      <p>Esqueceu sua senha?</p>
      <button
        disabled={
          !loginEmail?.match(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/) ||
          !loginPassword
        }
        onClick={login}
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
      <div>
        <p>
          Ao assinar você concorda com os
          <a
            className={style.services}
            onClick={() => {
              setModal(true)
            }}
          >
            Termos e serviços
          </a>
          e
          <a
            className={style.services}
            onClick={() => {
              setModal(true)
            }}
          >
            política de privacidade
          </a>
        </p>
      </div>
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
        {modal && (
          <div className={style.modal}>
            <div className={style.modalContent}>
              <h3>Termos e política de privacidade</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <button
                onClick={() => {
                  setModal(false)
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </AsideLayout>
  )
}

export default Login
