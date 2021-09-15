import { useEffect } from 'react'

import { GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import { FaCalendarAlt, FaUser, FaClock } from 'react-icons/fa'
import Header from '../../components/Header';
import styles from './post.module.scss';
import Prismic from '@prismicio/client'

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useRouter } from 'next/router';

import { useUtterances } from '../../hooks/useUtterances'

interface Post {
  last_publication_date: string | null; 
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
  const commentNodeId = 'comments';
  useUtterances(commentNodeId);
  const router = useRouter()

  if(router.isFallback){
    return <h3>Carregando...</h3>
  }

  return(
    <>
    <Header />
    <div className={styles.banner}>
        <img src={props.post.data.banner.url} />
      </div>
    <div className={styles.container}>
        <main>
          <section>
            <h1 
              dangerouslySetInnerHTML={{__html: props.post.data.title}}
            />
            <div className={styles.span}>
            <span>
              <FaCalendarAlt className={styles.icon} />
              {format(new Date(props.post.first_publication_date), 'dd LLL Y', {  locale: ptBR,})}
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
          <p>* editado em {format(new Date(props.post.last_publication_date), 'dd LLL Y,  H:m', {  locale: ptBR,})}</p>
          </section>
          <article>
            {props.post.data.content.map(text => (
              <>
                <h3>{text.heading}</h3>
                {text.body.map(txt => (
                  <p key={props.post.data.title}>{txt.text}</p>
                ))}
              </>
            ))
            }
          </article>
        </main>
      </div>
      <div className={styles.comments} id={commentNodeId} />
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
    fallback: true,
  }

};

export const getStaticProps: GetStaticProps = async context => {
  const slug = context.params.slug
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', `${slug}`, {})
  const post = {
    last_publication_date: response.last_publication_date,
    first_publication_date: response.first_publication_date,
    uid: response.uid,
    data: {
      title: response.data.title[0].text, 
      banner: {
        url: response.data.banner.url
      },
      author: response.data.author,
      content: response.data.content.map((post) => {
        return {
          heading: post.heading[0].text,
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
