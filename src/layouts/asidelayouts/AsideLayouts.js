import Sidebar from '../../components/sidebar/Sidebar'
import style from './AsideLayouts.module.css'
function AsideLayouts({ children }) {
  return (
    <div className={style.container}>
      <Sidebar />
      <div className={style.content}>{children}</div>
    </div>
  )
}

export default AsideLayouts
