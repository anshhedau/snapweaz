import { Helmet } from "react-helmet-async";

type SEOProps = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  publishedTime?: string;
  author?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
};

const SITE = "https://www.snapweaz.com";
const DEFAULT_IMAGE = `${SITE}/og-image.jpg`;

export const SEO = ({
  title,
  description,
  path,
  type = "website",
  image = DEFAULT_IMAGE,
  publishedTime,
  author,
  jsonLd,
  noindex,
}: SEOProps) => {
  const url = `${SITE}${path}`;
  const fullTitle = title.includes("SnapWeaz") ? title : `${title} | SnapWeaz`;
  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="SnapWeaz" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {author && <meta property="article:author" content={author} />}

      {jsonLdArray.map((data, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(data)}</script>
      ))}
    </Helmet>
  );
};
