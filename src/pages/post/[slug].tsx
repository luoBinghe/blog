import { GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import { FaCalendarAlt, FaUser, FaClock } from 'react-icons/fa'
import Header from '../../components/Header';
import styles from './post.module.scss';
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

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

export default function Post(props: PostProps) {
  console.log('aa', props.post.data.content)
  return(
    <>
    <Header />
    <div className={styles.banner}>
        <img src={props.post.data.banner.url} />
      </div>
    <div className={styles.container}>
        <main>
          <section>
            <h1>{props.post.data.title}</h1>
            <div className={styles.span}>
            <span>
              <FaCalendarAlt className={styles.icon} />
              {props.post.first_publication_date}
            </span>
            <span>
              <FaUser className={styles.icon}/>
              {props.post.data.author}
            </span>
            <span>
              <FaClock className={styles.icon}/>
              4 min
            </span>
          </div>
          </section>
          <article>
            <h3>{props.post.data.content.map(a => a.heading)}</h3>
            {props.post.data.content.map(text => (
                text.body.map(txt => (
                  <p>{txt.text}</p>
                ))
            ))
            }
          </article>
        </main>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {

  const prismic = getPrismicClient();
  const posts = await prismic.query([Prismic.Predicates.at('document.type', 'posts')]);
  const paths = posts.results.map((post) => ({
    params: { slug: post.uid.toString() }
  }))

  return {
    paths,
    fallback: false,
  }

};

export const getStaticProps: GetStaticProps = async context => {
  const slug = context.params.slug
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', `${slug}`, {})
  const post = {
    first_publication_date: new Date(response.first_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
    data: {
      title: RichText.asText(response.data.title),
      banner: {
        url: response.data.banner.url
      },
      author: response.data.author,
      content: response.data.content.map((post) => {
        return {
          heading: RichText.asText(post.heading),
          body: post.body.map((text: { text: any; }) => {
            return {
              text: text.text
            }
          })
        }
      })
    }
  }
  return{
    props: {
      post
    }
  }
};
