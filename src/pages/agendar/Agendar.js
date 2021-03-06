import Api from '../../services/Api'
import style from './Agendar.module.css'
import { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import UserLayout from '../../layouts/userLayouts/UserLayouts'
import ReactPaginate from 'react-paginate'
import ItemCard from '../../components/itemcard/ItemCard'
import TimeCard from '../../components/timecard/TimeCard'
import { rightArrow, PageNext, PagePrevious } from '../../assets/Icons'
import MyAgenda from '../../components/myagenda/MyAgenda'
import { Context } from '../../contexts/userContext'
import ModalAgenda from '../../components/modalagenda/ModalAgenda'

function Agendar() {
  const [campanhas, setCampanhas] = useState([])
  const [grupos, setGrupos] = useState([])
  const [disponibilidades, setDisponibilidades] = useState([])
  const [datas, setDatas] = useState([])
  const [municipios, setMunicipios] = useState([])
  const [itemPage, setItemPage] = useState([])
  const [filterData, setFilterData] = useState()
  const [filterCampanha, setFilterCampanha] = useState()
  const [filterGrupo, setFilterGrupo] = useState()
  const [filterMunicipio, setFilterMunicipio] = useState()
  const [tipoExame, setTipoExame] = useState('RT-PC')
  const [agendamentos, setAgendamentos] = useState()
  const [localizacao, setLocalizacao] = useState()
  const [hora, setHora] = useState()
  const [itemSelected, setItemSelected] = useState()
  const [comprovante, setComprovante] = useState()
  const { user } = useContext(Context)

  const getCampanha = async () => {
    try {
      const response = await Api.axios.get('/campanha')
      setCampanhas(response.data)
      setFilterCampanha(response.data[0])
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  const getGrupos = async () => {
    try {
      const response = await Api.axios.get('/grupos-atendimentos')
      setGrupos(response.data)
      setFilterGrupo(response.data[0])
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  const getDisponibilidade = async () => {
    try {
      const response = await Api.axios.get('/agendamento-disponibilidade')

      const disponibilidade = response.data.reduce(
        (acc, curr) => {
          if (!acc.municipios.includes(curr.municipio))
            acc.municipios.push(curr.municipio)

          if (!acc.datas.includes(curr.data)) acc.datas.push(curr.data)
          return acc
        },
        { municipios: ['Natal'], datas: ['02-23-2022'] }
      )

      setDisponibilidades(response.data)
      setMunicipios(disponibilidade.municipios)
      setDatas(disponibilidade.datas)
      setFilterData(disponibilidade.datas[0])
      setFilterMunicipio(disponibilidade.municipios[0])
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  const postAgendamento = async () => {
    try {
      const agendamentoData = {
        usuario_id: user.id,
        campanha_id: filterCampanha.id,
        grupo_atendimento_id: filterGrupo.id,
        municipio: filterMunicipio,
        localizacao: localizacao,
        data: filterData,
        hora: hora,
        status: 'AGENDADO',
        tipo_exame: tipoExame
      }
      const response = await Api.axios.post('/agendamentos', agendamentoData)
      if (response) {
        toast.success('Agendado com sucesso')
        setComprovante(response.data)
      }
    } catch (error) {
      toast.error(error.response.data)
    }
  }
  const renderByPagination = page => {
    const firstIndexItem = page * 3
    const pagedItem = disponibilidades.slice(firstIndexItem, firstIndexItem + 3)

    setItemPage(pagedItem)
  }

  const getFilteredAgenda = async () => {
    try {
      const response = await Api.axios.get(
        `/agendamento-disponibilidade?campanha=${filterCampanha.nome}&municipio=${filterMunicipio}&data=${filterData}`
      )

      setDisponibilidades(response.data)
    } catch (error) {
      toast.error(error.response.data)
    }
  }
  const getAgendamentos = async () => {
    try {
      const response = await Api.axios.get('/agendamentos')

      setAgendamentos(
        response.data.filter(
          prop => user.id === prop.usuario_id && prop.localizacao
        )
      )
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  const handleCancelAgenda = async id => {
    try {
      const response = await Api.axios.patch(`/agendamentos/${id}`, {
        status: 'Cancelado'
      })
      if (response) {
        getAgendamentos()
        setComprovante(null)
        toast.success('Agendamento cancelado com sucesso')
      }
    } catch (error) {
      toast.error(error.response.data)
    }
  }
  useEffect(() => {
    if (disponibilidades) renderByPagination(0)
  }, [disponibilidades])

  useEffect(() => {
    getCampanha()
    getGrupos()
    getDisponibilidade()
  }, [])
  const createMyAgenda = () => {}
  const FilterCard = () => (
    <div>
      <h3 className={style.title}>Agendar</h3>
      <div className={style.filter}>
        <div className={style.individualFilter}>
          <label for="tipo" className={style.filterTitle}>
            Campanha
          </label>
          <select
            id="tipo"
            className={style.select}
            value={filterCampanha?.nome}
            onChange={event => {
              setFilterCampanha(
                campanhas.find(campanha => campanha.nome === event.target.value)
              )
            }}
          >
            {campanhas.map((campanha, i) => {
              return (
                <option key={i} value={campanha.nome}>
                  {campanha.nome}
                </option>
              )
            })}
          </select>
        </div>

        <div className={style.individualFilter}>
          <label for="city" className={style.filterTitle}>
            Munic??pio
          </label>
          <select
            id="city"
            className={style.select}
            onChange={event => {
              setFilterMunicipio(event.target.value)
            }}
            value={filterMunicipio}
          >
            {municipios.map((municipio, i) => {
              return (
                <option key={i} value={municipio}>
                  {municipio}
                </option>
              )
            })}
          </select>
        </div>

        <div className={style.individualFilter}>
          <label for="group" className={style.filterTitle}>
            Grupo de atendimento
          </label>
          <select
            id="group"
            className={style.select}
            onChange={event => {
              setFilterGrupo(
                grupos.find(group => group.nome === event.target.value)
              )
            }}
            value={filterGrupo?.nome}
          >
            {grupos.map((grupo, i) => {
              return (
                <option key={i} value={grupo.nome}>
                  {grupo.nome}
                </option>
              )
            })}
          </select>
        </div>

        <div className={style.individualFilter}>
          <label for="date" className={style.filterTitle}>
            Data
          </label>
          <input
            type="date"
            onChange={event => {
              const dateArray = event.target.value.split('-')
              setFilterData(`${dateArray[1]}-${dateArray[2]}-${dateArray[0]}`)
            }}
            value={filterData ? format(new Date(filterData), 'yyyy-MM-dd') : ''}
            className={style.dataPicker}
          />
        </div>

        <div className={style.individualFilter}>
          <label for="exam" className={style.filterTitle}>
            Tipo de exame
          </label>
          <div id="exam">
            <div className={style.inputRatio}>
              <input
                type="radio"
                id="RT"
                name="RT"
                value="RT-PC"
                onChange={event => {
                  setTipoExame(event.target.value)
                }}
                checked={tipoExame === 'RT-PC'}
              />
              <label for="RT" className={style.ratioLabel}>
                RT-PC
              </label>
            </div>
            <div className={style.inputRatio}>
              <input
                type="radio"
                id="anti"
                nome="anti"
                value="Ant??geno"
                onChange={event => {
                  setTipoExame(event.target.value)
                }}
                checked={tipoExame === 'Ant??geno'}
              />
              <label for="anti" className={style.ratioLabel}>
                Ant??geno
              </label>
            </div>
          </div>
        </div>
        <button
          className={style.signupButton}
          onClick={() => {
            getFilteredAgenda()
          }}
        >
          Procurar
        </button>
      </div>
    </div>
  )
  return (
    <UserLayout>
      <FilterCard />
      <div className={style.vagasContainer}>
        {itemPage?.length > 0 ? (
          <>
            <div>
              <h3 className={style.cardTitle}>
                Locais de exames
                {!!itemPage[0]?.data &&
                  ` - ${format(new Date(itemPage[0]?.data), 'dd/MM/yyyy')}`}
              </h3>
            </div>
            <div className={style.horariosDisponiveis}>
              {itemPage.map((item, i) => (
                <ItemCard
                  key={i}
                  local={item.localizacao}
                  camp={campanhas}
                  disp={Object.entries(item.vagas)}
                >
                  {Object.entries(item.vagas).map((vagas, j) => {
                    return (
                      <TimeCard
                        key={j}
                        disp={vagas}
                        onClick={() => {
                          setLocalizacao(item.localizacao)
                          setHora(vagas[0])
                          setItemSelected({ id: item.id, hora: vagas })
                        }}
                        active={
                          itemSelected?.id === item.id &&
                          vagas[0] === itemSelected?.hora[0]
                        }
                      />
                    )
                  })}
                </ItemCard>
              ))}
            </div>
            <div className={style.changePage}>
              <button
                className={style.aplicarFiltro}
                onClick={postAgendamento}
                disabled={!itemSelected}
              >
                Continuar
              </button>
              <ReactPaginate
                initialPage={0}
                pageRangeDisplayed={1}
                pageCount={disponibilidades.length / 3}
                activeClassName={style.activePage}
                onPageChange={({ selected }) => renderByPagination(selected)}
                nextLabel={<PageNext />}
                previousLabel={<PagePrevious />}
                className={style.pagination}
              />
            </div>
          </>
        ) : (
          <span>N??o foi encontrado</span>
        )}
      </div>
      {comprovante && (
        <ModalAgenda
          data={format(new Date(comprovante.data), 'dd/MM/yyyy')}
          hora={comprovante.hora}
          status={comprovante.status}
          local={comprovante.localizacao}
          nome={user?.nome}
          onClick={() => setComprovante(null)}
          onCancel={() => handleCancelAgenda(comprovante.id)}
        />
      )}
    </UserLayout>
  )
}

export default Agendar
