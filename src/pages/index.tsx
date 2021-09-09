import { useState } from 'react'
import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { FaCalendarAlt, FaUser } from 'react-icons/fa'
import Prismic from '@prismicio/client'
import Link from 'next/link'

import { RichText } from 'prismic-dom'

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';


interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: [
      text: string | null,
    ],
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

export default function Home({ postsPagination }: HomeProps) {
  const [pagination, setPagination] = useState(4)
  console.log('aa', postsPagination)
  function handleNewQuery(){
    setPagination(pagination + 2)
  }

  return(
    <div className={styles.container}>
      <img src="/images/logo.svg" />

      {postsPagination.results.slice(0, pagination).map(post => (
        <section key={post.uid}>
          <Link href={`/post/${post.uid}`} >
            <a>{post.data.title}</a>
          </Link>
          <p>{post.data.subtitle}</p>
          <div className={styles.span}>
            <span>
              <FaCalendarAlt className={styles.icon} />
              {post.first_publication_date}
            </span>
            <span>
              <FaUser  className={styles.icon} />
              { post.data.author }
            </span>
          </div>
        </section>
      ))}
      {postsPagination !== null && postsPagination !== undefined &&
      pagination -1 !== postsPagination.results.length && (
        <button onClick={handleNewQuery}>
          Carregar mais posts 
        </button>
      )}
    </div>

  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query([
    Prismic.Predicates.at('document.type', 'posts')
  ],
    {
      fetch: ['post.title', 'post.content'],
      pageSize: 50,
    }
  );

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: format(new Date(post.first_publication_date), 'dd LLL Y', {
        locale: ptBR,
      }),
      data: {
        title: post.data.title.map(title => (
          RichText.asText(title.text)
        )),
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    } 
  })

  const postsPagination = {
    next_page: postsResponse.next_page,
    results: posts
  }

  return {
    props: {
      postsPagination
    }
  }
};
