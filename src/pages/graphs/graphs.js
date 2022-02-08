import ApexChart from 'react-apexcharts'
import Api from '../../services/Api'
import { useEffect, useState } from 'react'
import AsideLayouts from '../../layouts/asidelayouts/AsideLayouts'

function Graphs() {
  const [vacinaRecebida, setvacinaRecebida] = useState()
  const [dosesAplicada, setdosesAplicada] = useState()
  const [vacinadosGeral, setvacinadosGeral] = useState()

  const getTransparencia = async () => {
    try {
      const response = await Api.axios.get('/transparencia')
      setvacinaRecebida(response.data.doses.recebidas)
      setdosesAplicada(response.data.doses.aplicadas)
      setvacinadosGeral(response.data.vacinacao)
    } catch (e) {
      console.log(e.response)
    }
  }

  useEffect(() => {
    getTransparencia()
  }, [])

  console.log(vacinaRecebida, dosesAplicada, vacinadosGeral)
  return (
    <AsideLayouts>
      <ApexChart
        options={{ chart: { id: 'basicBar' }, labels: ['Coronavac', 'Pfizer'] }}
        series={[
          parseInt(vacinaRecebida?.coronavac?.replace('%', '')),
          parseInt(vacinaRecebida?.pfizer?.replace('%', ''))
        ]}
        type="pie"
        width="500"
      />
    </AsideLayouts>
  )
}

export default Graphs
