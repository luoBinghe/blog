import style from './header.module.scss'
import Link from 'next/link'

export default function () {
  return(
    <div className={style.container}>
      <header>
        <Link href="/">
          <a>
            <img src="/images/logo.svg"/>
          </a>
        </Link>
      </header>
    </div>
  )
}
