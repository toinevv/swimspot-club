
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  city?: string;
}

const SEOHead = ({ title, description, city }: SEOHeadProps) => {
  const siteName = "SwimSpot";
  const fullTitle = city ? `${title} | ${siteName}` : `${title} | ${siteName}`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {city && (
        <>
          <meta name="geo.region" content="NL" />
          <meta name="geo.placename" content={city} />
        </>
      )}
    </Helmet>
  );
};

export default SEOHead;
