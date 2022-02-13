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
        localStorage.setItem('token', response.data.accessToken)
        setUser(response.data.user)
        navigate('/agendamento')
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
        navigate('/agendamentos')
      }
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  const token = localStorage.getItem('token')
  useEffect(() => {
    if (user && token) navigate('/agendamentos')
  }, [user, token])

  const steps = [
    <div className={style.loginContainer}>
      <div className={style.loginContent}>
        <p style={{ color: '#f72585', marginBottom: '20px' }}>
          Preencha os campos abaixo
        </p>
        <div className={style.formStyle}>
          <div className={style.input}>
            <label className={style.labelStyle} for="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={loginEmail}
              onChange={event => {
                setLoginEmail(event.target.value)
              }}
              className={style.inputStyle}
            />
          </div>

          <div className={style.input}>
            <label className={style.labelStyle} for="password">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={loginPassword}
              onChange={event => {
                setLoginPassword(event.target.value)
              }}
              className={style.inputStyle}
            />
          </div>
        </div>

        <p className={style.forgetPass}>Esqueceu sua senha?</p>

        <button
          disabled={!loginEmail?.match(/^\w+([.-]?\w+)@/) || !loginPassword}
          onClick={login}
          className={style.signupButton}
        >
          Entrar
        </button>
      </div>
    </div>,

    <div className={style.loginSecondContainer}>
      <div className={style.loginSecondContent}>
        <div className={style.title}>
          <h3 style={{ color: '#f72585' }}>Preencha os campos abaixo</h3>
          <p className={style.titlePara}>É rápido, simples e seguro</p>
        </div>
        <div className={style.input}>
          <label for="email" className={style.labelStyle}>
            Email
          </label>
          <input
            type="text"
            id="email"
            onChange={event => {
              setEmail(event.target.value)
            }}
            className={style.inputStyle}
          />
        </div>
        <button
          onClick={() => {
            setIndex(2)
          }}
          disabled={!email.match(/^\w+([.-]?\w+)@/)}
          className={style.signupButton}
        >
          Continuar
        </button>
      </div>
    </div>,

    <div className={style.loginContainer}>
      <div className={style.loginContent}>
        <div className={style.title}>
          <h3 style={{ color: '#f72585' }}>Preencha os campos abaixo</h3>
          <p className={style.titlePara}>É rápido, simples e seguro</p>
        </div>
        <div className={style.input}>
          <label for="email" className={style.labelStyle}>
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={event => {
              setEmail(event.target.value)
            }}
            className={style.inputStyle}
          />
        </div>

        <div className={style.input}>
          <label for="nome" className={style.labelStyle}>
            Nome
          </label>
          <input
            type="text"
            id="nome"
            value={name}
            onChange={event => {
              setName(event.target.value)
            }}
            className={style.inputStyle}
          />
        </div>

        <div className={style.input}>
          <label for="password" className={style.labelStyle}>
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={event => {
              setPassword(event.target.value)
            }}
            className={style.inputStyle}
          />
        </div>

        <div className={style.input}>
          <label for="confirmPassword" className={style.labelStyle}>
            Confirmação de senha
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={event => {
              setConfirmPassword(event.target.value)
            }}
            className={style.inputStyle}
          />
        </div>
        <button
          disabled={
            password != confirmPassword ||
            !email.match(/^\w+([.-]?\w+)@/) ||
            !password ||
            !name
          }
          onClick={postUser}
          className={style.continueButton}
        >
          Continuar
        </button>
      </div>
      <div className={style.servicesContainer}>
        <p className={style.termsServices}>
          Ao assinar você concorda com os{' '}
          <a
            className={style.services}
            onClick={() => {
              setModal(true)
            }}
          >
            Termos e serviços
          </a>{' '}
          e{' '}
          <a
            className={style.services}
            onClick={() => {
              setModal(true)
            }}
          >
            {' '}
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
          <p style={{ color: '#4a4a4a' }}>
            {index === 0 ? 'Não tem uma conta?' : 'Já tem conta?'}
          </p>
          <button
            onClick={() => {
              setIndex(index === 0 ? 1 : 0)
            }}
            className={style.createButton}
          >
            {index === 0 ? 'Crie uma' : 'Entrar'}
          </button>
        </div>
        {steps[index]}
        {modal && (
          <div className={style.modalContainer}>
            <div className={style.backDrop} />
            <div className={style.modalContent}>
              <h1 style={{ color: '#F72585' }}>
                Termos e política de privacidade
              </h1>
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
                of type and scrambled it to make a type specimen book.
              </p>
              <div className={style.modalCloseButtonContainer}>
                <button
                  onClick={() => {
                    setModal(false)
                  }}
                  className={style.modalCloseButton}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AsideLayout>
  )
}

export default Login
