import ApexChart from 'react-apexcharts'
import Api from '../../services/Api'
import { useEffect, useState } from 'react'
import AsideLayouts from '../../layouts/asidelayouts/AsideLayouts'
import style from './graphs.module.css'
import { useNavigate } from 'react-router-dom'

function Graphs() {
  const [vacinaRecebida, setvacinaRecebida] = useState()
  const [dosesAplicada, setdosesAplicada] = useState()
  const [vacinadosGeral, setvacinadosGeral] = useState()
  const navigate = useNavigate()
  const getTransparencia = async () => {
    try {
      const response = await Api.axios.get('/transparencia')
      setvacinaRecebida(response.data.doses.recebidas)
      setdosesAplicada(response.data.doses.aplicadas)
      setvacinadosGeral(response.data.vacinacao)
    } catch (e) {
      console.log(e.response.data)
    }
  }

  useEffect(() => {
    getTransparencia()
  }, [])

  return (
    <AsideLayouts>
      <div className={style.container}>
        <div className={style.header}>
          <h3 className={style.transparencyTitle}>Transparência</h3>
          <div className={style.buttonContainer}>
            <button className={style.buttons}>Filtrar</button>
            <button
              onClick={() => {
                navigate('/')
              }}
              className={style.buttons}
            >
              Voltar
            </button>
          </div>
        </div>
        <ApexChart
          options={{
            chart: { id: 'basicBar' },
            labels: ['Coronavac', 'Pfizer']
          }}
          series={[
            parseInt(vacinaRecebida?.coronavac?.replace('%', '')),
            parseInt(vacinaRecebida?.pfizer?.replace('%', ''))
          ]}
          type="pie"
          width="300"
        />
      </div>
      {
        <ApexChart
          options={{
            chart: { id: 'basicBar' },
            xaxis: [
              dosesAplicada.map(item => {
                return item.faixa
              })
            ]
          }}
          series={[10, 15, 13]}
          type="bar"
          width="500"
        />
        /*
      <ApexChart
        options={{ chart: { id: 'basicBar' }, labels: ['Coronavac', 'Pfizer'] }}
        series={[
          parseInt(vacinaRecebida?.coronavac?.replace('%', '')),
          parseInt(vacinaRecebida?.pfizer?.replace('%', ''))
        ]}
        type="pie"
        width="250"
      /> */
      }
    </AsideLayouts>
  )
}

export default Graphs
