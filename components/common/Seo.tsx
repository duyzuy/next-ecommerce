import Head from 'next/head';

type PropsType = {
  title?: string;
  description?: string;
  siteTitle?: string;
  thumbnail?: string;
};
const SEO: React.FC<PropsType> = ({
  title,
  description,
  siteTitle = 'Saigonhomekitchen',
  thumbnail
}) => {
  return (
    <Head>
      <title>{`${title} | ${siteTitle}`}</title>
      {/* <meta name="viewport" content="viewport-fit=cover" /> */}
      <link rel="icon" href="/assets/images/favicon-sgh-red.svg" />
      <meta name="desciption" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content={`twiiter`} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="og:image" content={thumbnail} />
    </Head>
  );
};
export default SEO;
