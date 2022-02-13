import style from './GraphFilter.module.css'

function GraphFilter({ filter }) {
  const municipios = filter?.reduce((acc, curr) => {
    if (!acc.includes(curr.municipio)) acc.push(curr.municipio)
    return acc
  }, [])
  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1>Filtros</h1>
        <div>
          <input type="text" className={style.input} />
        </div>
        <div className={style.municipio}>
          <p>Município</p>
        </div>
        <div className={style.municipiosInput}>
          {municipios?.map(item => {
            if (item) {
              return (
                <div>
                  <input type="radio" /> {item}
                </div>
              )
            }
          })}
        </div>
        <div className={style.buttonContainer}>
          <button className={style.cancelButton}>Cancelar</button>
          <button className={style.filterButton}>Filtrar</button>
        </div>
      </div>
    </div>
  )
}

export default GraphFilter
