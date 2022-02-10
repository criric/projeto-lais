import UserLayout from '../../layouts/userLayouts/UserLayouts'
import Api from '../../services/Api'
import { useState } from 'react'
import { toast } from 'react-toastify'
function User() {
  const [index, setIndex] = useState(1)

  const getAgendamentos = async () => {
    try {
      const response = Api.axios.get('/agendamentos')
      console.log(response)
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  const steps = [
    <div>
      <h3>Meus agendamentos</h3>
      <div>
        <p>Filtrar agendamento</p>
        <img />
        <select>
          <option>Local do exame</option>
          <option>Data</option>
          <option>Horário</option>
          <option>Tipo de Exame</option>
        </select>
      </div>
    </div>,
    <div>
      <h3>Agendar</h3>
      <div>
        <div>
          <label for="tipo">Campanha</label>
          <select id="tipo">
            <option>Covid-19</option>
          </select>
        </div>

        <div>
          <label for="city">Município</label>
          <select id="city">
            <option>Natal</option>
            <option>Mossoró</option>
            <option>Acarí</option>
          </select>
        </div>

        <div>
          <label for="group">Grupo de atendimento</label>
          <select id="group">
            <option>Pessoas acima de 75 anos</option>
            <option>resto</option>
          </select>
        </div>

        <div>
          <label for="date">Data</label>
          <select id="date">
            <option>04/02/2022</option>
          </select>
        </div>

        <div>
          <label for="exam">Data</label>
          <div id="exam">
            <input type="radio" id="RT" />
            <label for="RT">RT-PC</label>
            <input type="radio" id="anti" />
            <label for="anti">Antígeno</label>
          </div>
        </div>
        <button>Procurar</button>
      </div>
    </div>
  ]
  return <UserLayout>{steps[index]}</UserLayout>
}

export default User
