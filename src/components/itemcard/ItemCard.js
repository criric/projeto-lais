import style from './ItemCard.module.css'
function ItemCard({ children, local, camp, disp }) {
  return (
    <div className={style.container}>
      <h3 className={style.vagasTitle}>
        {local} | {camp[0].nome} | {disp[0][0]} às {disp[disp.length - 1][0]}
      </h3>
      <div className={style.vagasDisponiveis}>{children}</div>
      <hr />
    </div>
  )
}

export default ItemCard
