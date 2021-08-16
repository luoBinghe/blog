import { GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import { FaCalendarAlt, FaUser, FaClock } from 'react-icons/fa'
import Header from '../../components/Header';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post() {
  return(
    <>
    <Header />
    <div className={styles.banner}>
        <img src="/images/banner.jpeg" />
      </div>
    <div className={styles.container}>
        <main>
          <section>
            <h1>Criando um app CRA do zero</h1>
            <div className={styles.span}>
            <span>
              <FaCalendarAlt className={styles.icon} />
              15 Mar 2021 
            </span>
            <span>
              <FaUser className={styles.icon}/>
              Joseph Oliveira
            </span>
            <span>
              <FaClock className={styles.icon}/>
              4 min
            </span>
          </div>
          </section>
          <article>
            <h3>Proin et varius</h3>
            <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took.
            </p>
            <br/>
            <br/>
            <p>
            t has survived not only five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </p>
          </article>
        </main>
      </div>
    </>
  )
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
