import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { FaCalendarAlt, FaUser } from 'react-icons/fa'
import Prismic from '@prismicio/client'
import Link from 'next/link'

import { RichText } from 'prismic-dom'


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

interface PostProps {
  posts: Post[]
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ posts }: PostProps) {
  return(
    <div className={styles.container}>
      <img src="/images/logo.svg" />

      {posts.map(post => (
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
      <button>
        Carregar mais posts
      </button>
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
      pageSize: 100,
    }
  );

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: new Date(post.first_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
      data: {
        title: RichText.asText(post.data.title),
        subtitle: post.data.subtitle,
        author: post.data.author,
      }
    } 
  })

  console.log(posts)
  return {
    props: {
      posts
    }
  }
};
