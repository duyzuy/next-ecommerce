import React, { useMemo } from 'react';
import { getAllPostSlugs, getPostBySlug } from '../../../api/post';
import { Container } from 'semantic-ui-react';
import Breadcrumb from '../../../components/BreadCrumb';
import { useRouter } from 'next/router';
import { useBreadcrumb } from '../../../hooks/useBreadcrumb';
import { BreadcrumbItemType } from '../../../model';
import styles from '../post.module.scss';
import Image from 'next/image';
type PropsType = {
  postData?: { [key: string]: any };
};
const PostDetail: React.FC<PropsType> = (props) => {
  const { postData } = props;

  const router = useRouter();
  const items = useBreadcrumb(router);
  const bredcrumds = useMemo(() => {
    let itemList = items;

    itemList = [
      ...items,
      {
        id: 'postDetail',
        path: '/',
        name: postData.title
      }
    ];
    return itemList;
  }, [items]);
  return (
    <div className={styles.wrapper}>
      <Container>
        <div className="post-bredcrumb">
          <Breadcrumb items={bredcrumds} />
        </div>
      </Container>
      <Container className="post-container">
        <div className="single-post">
          <div className="post-body">
            <div className="post-header">
              <div className="thumbnail">
                <Image
                  src={postData.thumbnail}
                  layout="responsive"
                  width={90}
                  height={45}
                  objectFit="cover"
                />
              </div>
              <div
                className="title"
                style={{ paddingTop: '20px', paddingBottom: '20px' }}
              >
                <h1 className="title text-center">{postData.title}</h1>
              </div>
            </div>
            <div className="post-content">
              <div
                className="post-description"
                dangerouslySetInnerHTML={{ __html: postData.content }}
              ></div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export async function getStaticPaths() {
  const response = await getAllPostSlugs();
  let paths = response.data.posts.map((post) => ({
    params: { slug: post.slug }
  }));
  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps(ctx) {
  const { params, locales, locale } = ctx;
  console.log({ ctx });
  // console.log(`regenerate product detail ${params.slug}`);
  const response = await getPostBySlug(params.slug);
  if (response.status === 404) {
    return {
      notFound: true
    };
  }
  console.log({ response });
  // const reviews = await getReviewsByProductId(response.data.id);

  // const { related_ids, upsell_ids } = response.data;
  // const productRelated = await getProductsByIds(related_ids);

  return {
    props: {
      postData: { ...response.data.data }
      // reviews: reviews,
      // productRelated: productRelated
    },
    revalidate: 10
  };
}

export default PostDetail;
