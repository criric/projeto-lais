import ApexChart from 'react-apexcharts'
import Api from '../../services/Api'
import { useEffect, useState } from 'react'
import AsideLayouts from '../../layouts/asidelayouts/AsideLayouts'
import style from './graphs.module.css'
import { useNavigate } from 'react-router-dom'
import React, { Component } from 'react'
import { render } from '@testing-library/react'

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
                    }
                  }}
                  series={dosesAplicada.reduce((acc, curr, index) => {
                    const seila = {
                      name: Object.entries(curr.doses)[index][0],
                      data: Object.entries(curr.doses)[index][1]
                    }
                    console.log(Object.entries(curr.doses))
                    // acc.push()
                    // return acc
                  }, [])}
                  type="bar"
                  width="500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/*
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
        
      <ApexChart
        options={{ chart: { id: 'basicBar' }, labels: ['Coronavac', 'Pfizer'] }}
        series={[
          parseInt(vacinaRecebida?.coronavac?.replace('%', '')),
          parseInt(vacinaRecebida?.pfizer?.replace('%', ''))
        ]}
        type="pie"
        width="250"
      /> */}
    </AsideLayouts>
  )
}

export default Graphs
