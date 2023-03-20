import React from 'react';
import { getAllPosts } from '../../api/post';
import { PostItemType } from '../../model/post';
import { Container } from 'semantic-ui-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './post.module.scss';
import SEO from '../../components/common/Seo';
import Breadcrumb from '../../components/BreadCrumb';
import * as Icon from 'react-feather';
import { useBreadcrumb } from '../../hooks/useBreadcrumb';
import { useRouter } from 'next/router';

type PropsType = {
  postData: {
    posts: PostItemType[];
    perPage: number;
    page: number;
    total: number;
  };
};
const PostPage: React.FC<PropsType> = (props) => {
  const { postData } = props;
  const router = useRouter();
  const breadItems = useBreadcrumb(router);
  return (
    <div className={styles.wrapper}>
      <SEO title="bog tin tuc" description="bep tu nhap khau chinh hang" />
      <div className="header-page">
        <Container>
          <h1 className="title center">Blog</h1>
          <Breadcrumb items={breadItems} />
        </Container>
      </div>
      <Container>
        <div className="post-list">
          {postData.posts.map((post) => (
            <div className="box post-item" data-id={post.id} key={post.id}>
              <div className="thumbnail">
                {(post.thumbnail && (
                  <Image
                    src={post.thumbnail || ''}
                    className="image"
                    layout="responsive"
                    width={900}
                    height={450}
                    objectFit="cover"
                  />
                )) || (
                  <div className="image no-image">
                    <div className="inner-no-image">
                      <div className="icon-image">
                        <Icon.Image size={32} color="#000" />
                        <p>No image</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="content">
                <h3 className="title">
                  <Link href={`post/${post.slug}`}>
                    <a dangerouslySetInnerHTML={{ __html: post.title }} />
                  </Link>
                </h3>
                <div
                  className="excerpt"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="pagination"></div>
      </Container>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { query, res, req } = ctx;

  const response = await getAllPosts({
    perPage: 12,
    page: 1,
    offset: 0
  });

  if (response.status === 200) {
  }

  return {
    props: {
      postData: response.data
    }
  };
}

export default PostPage;
