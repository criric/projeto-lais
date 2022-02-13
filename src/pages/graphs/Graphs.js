import ApexChart from 'react-apexcharts'
import Api from '../../services/Api'
import { useEffect, useState } from 'react'
import AsideLayouts from '../../layouts/asidelayouts/AsideLayouts'
import style from './graphs.module.css'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { toast } from 'react-toastify'
import GraphFilter from '../../components/graphfilter/GraphFilter'

function Graphs() {
  const [vacinaRecebida, setvacinaRecebida] = useState()
  const [dosesAplicada, setdosesAplicada] = useState()
  const [vacinadosGeral, setvacinadosGeral] = useState()
  const [filter, setFilter] = useState()

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
  const getAgendamentos = async () => {
    try {
      const response = await Api.axios.get('/agendamentos')
      if (response) {
        setFilter(response.data)
        toast.success('get feito')
      }
    } catch (error) {
      toast.error(error.response.data)
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
            <button className={style.buttons} onClick={getAgendamentos}>
              Filtrar
            </button>
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

        <div className={style.graphsContainer}>
          <div className={style.graph}>
            <h1>Doses recebidas</h1>
            <ApexChart
              options={{
                chart: { id: 'basicBar' },
                labels: ['Coronavac', 'Pfizer'],
                colors: ['#F72585', '#3A0CA3']
              }}
              series={[
                parseInt(vacinaRecebida?.coronavac?.replace('%', '')),
                parseInt(vacinaRecebida?.pfizer?.replace('%', ''))
              ]}
              type="pie"
              width="300"
              height="250"
            />
          </div>
          <div className={style.graph}>
            <h1>Doses aplicadas</h1>
            {dosesAplicada?.length > 0 && (
              <div className="app">
                <div className="row">
                  <div className="mixed-chart">
                    <ApexChart
                      options={{
                        chart: {
                          id: 'basic-bar',
                          type: 'bar'
                        },
                        xaxis: {
                          categories: dosesAplicada.map(item => item.faixa)
                        },
                        colors: ['#7E1FB4', '#1FB451', '#1F78B4']
                      }}
                      series={dosesAplicada.reduce(
                        (acc, curr) => {
                          Object.values(curr.doses).forEach((item, index) =>
                            acc[index].data.push(item)
                          )
                          return acc
                        },
                        dosesAplicada.map((item, i) => ({
                          name: Object.keys(item.doses)[i],
                          data: []
                        }))
                      )}
                      type="bar"
                      width="300"
                      height="250"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={style.graph}>
            <h1>Vacinados geral</h1>
            {vacinadosGeral?.length > 0 && (
              <ApexChart
                series={[
                  {
                    name: 'Vacinados',
                    data: vacinadosGeral.reduce((acc, curr, index) => {
                      Object.values(curr.doses).forEach(
                        (value, index) => (acc[index] += value)
                      )

                      return acc
                    }, new Array(vacinadosGeral.length).fill(0))
                  }
                ]}
                options={{
                  chart: {
                    type: 'bar',
                    height: 350
                  },
                  plotOptions: {
                    bar: {
                      borderRadius: 4,
                      horizontal: true
                    }
                  },
                  dataLabels: {
                    enabled: false
                  },
                  xaxis: {
                    categories: vacinadosGeral?.map(
                      (item, i) => Object.keys(item.doses)[i]
                    )
                  },
                  colors: ['#7E1FB4', '#1FB451', '#1F78B4']
                }}
                type="bar"
                height="250"
                width="380"
              />
            )}
          </div>
        </div>
        {/* <GraphFilter filter={filter} /> */}
      </div>
    </AsideLayouts>
  )
}

export default Graphs
