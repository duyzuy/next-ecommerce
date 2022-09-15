import Head from 'next/head';

export default function SEO({
  title,
  description,
  siteTitle = 'Saigonhomekitchen',
  image
}) {
  return (
    <Head>
      <title>{`${title} | ${siteTitle}`}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="desciption" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content={`twiiter`} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
