import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { FaCalendarAlt, FaUser } from 'react-icons/fa'


interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return(
    <div className={styles.container}>
      <img src="/images/logo.svg" />

      <section>
        <a href="#">Como ultilizar Hooks</a>
        <p>Pensando em sicronização em uma vez de ciclos de vida.</p>
        <div className={styles.span}>
          <span>
            <FaCalendarAlt className={styles.icon} />
            15 Mar 2021 
          </span>
          <span>
            <FaUser  className={styles.icon} />
            Joseph Oliveira
          </span>
        </div>
      </section>

      <section>
        <a href="#">Como ultilizar Hooks</a>
        <p>Pensando em sicronização em uma vez de ciclos de vida.</p>
        <div className={styles.span}>
        <span>
            <FaCalendarAlt className={styles.icon} />
            15 Mar 2021 
          </span>
          <span>
            <FaUser className={styles.icon}/>
            Joseph Oliveira
          </span>
        </div>
      </section>

      <section>
        <a href="#">Criando uma aplicação CRA do zero</a>
        <p>Pensando em sicronização em uma vez de ciclos de vida.</p>
        <div className={styles.span}>
        <span>
            <FaCalendarAlt className={styles.icon}/>
            15 Mar 2021 
          </span>
          <span>
            <FaUser  className={styles.icon}/>
            Joseph Oliveira
          </span>
        </div>
      </section>

      <button>
        Carregar mais posts
      </button>
    </div>

  )
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
