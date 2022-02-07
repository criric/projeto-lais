import AsideLayout from '../../layouts/asidelayouts/AsideLayouts'
import style from './Login.module.css'
import { useState } from 'react'
function Login() {
  const [index, setIndex] = useState(0)
  const steps = [
    <div className={style.loginContainer}>
      <p>Preencha os campos abaixo</p>
      <div className={style.input}>
        <label for="email">Email</label>
        <input type="text" id="email" />
      </div>

      <div className={style.input}>
        <label for="password">Senha</label>
        <input type="password" id="password" />
      </div>
      <p>Esqueceu sua senha?</p>
      <button>Entrar</button>
    </div>,

    <div className={style.loginContainer}>
      <h4>Preencha os campos abaixo</h4>
      <p>É rápido, simples e seguro</p>
      <div className={style.input}>
        <label for="email">Email</label>
        <input type="text" id="email" />
      </div>
      <button
        onClick={() => {
          setIndex(2)
        }}
      >
        Continuar
      </button>
    </div>,

    <div className={style.loginContainer}>
      <p>Preencha os campos abaixo</p>
      <div className={style.input}>
        <label for="email">Email</label>
        <input type="text" id="email" />
      </div>

      <div className={style.input}>
        <label for="nome">Nome</label>
        <input type="text" id="nome" />
      </div>

      <div className={style.input}>
        <label for="password">Senha</label>
        <input type="password" id="password" />
      </div>

      <div className={style.input}>
        <label for="confirmPassword">Confirmação de senha</label>
        <input type="password" id="confirmPassword" />
      </div>
      <button>Continuar</button>
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
