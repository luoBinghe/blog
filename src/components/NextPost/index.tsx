import styles from './next.module.scss';
import Link from 'next/link'

export function NextPost(){
  return (
    <div className={styles.next}>
      <div>
        <span>Como ultilizar hooks</span>
        <a>Post Anterior</a>
      </div>
      <div>
        <span>Criando app CRA do zero</span>
        <a>Proximo post</a>
      </div>
    </div>
  )
}