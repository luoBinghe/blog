import style from './header.module.scss'

export default function () {
  return(
    <div className={style.container}>
      <header>
        <img src="/images/logo.svg"/>
      </header>
    </div>
  )
}
