import { Routes, Route } from 'react-router-dom'
import Agendamentos from '../pages/agendamentos/Agendamentos'
import Agendar from '../pages/agendar/Agendar'

function UserRouter() {
  return (
    <Routes>
      <Route path="/agendamentos" exact element={<Agendamentos />} />
      <Route path="/agendar" exact element={<Agendar />} />
    </Routes>
  )
}
export default UserRouter
