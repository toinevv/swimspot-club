
import { Helmet } from 'react-helmet-async';

interface BlogPostingSchema {
  type: 'BlogPosting';
  headline: string;
  description: string;
  image?: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  url: string;
}

interface PlaceSchema {
  type: 'Place';
  name: string;
  description: string;
  address?: {
    addressLocality: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  url: string;
}

interface OrganizationSchema {
  type: 'Organization';
  name: string;
  description: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}

interface StructuredDataProps {
  data: BlogPostingSchema | PlaceSchema | OrganizationSchema;
}

const StructuredData = ({ data }: StructuredDataProps) => {
  const generateSchema = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": data.type,
    };

    switch (data.type) {
      case 'BlogPosting':
        return {
          ...baseSchema,
          headline: data.headline,
          description: data.description,
          image: data.image,
          author: {
            "@type": "Person",
            name: data.author
          },
          datePublished: data.datePublished,
          dateModified: data.dateModified || data.datePublished,
          url: data.url,
          publisher: {
            "@type": "Organization",
            name: "SwimSpot",
            url: window.location.origin
          }
        };
      
      case 'Place':
        return {
          ...baseSchema,
          name: data.name,
          description: data.description,
          address: data.address,
          geo: {
            "@type": "GeoCoordinates",
            latitude: data.geo.latitude,
            longitude: data.geo.longitude
          },
          url: data.url
        };
      
      case 'Organization':
        return {
          ...baseSchema,
          name: data.name,
          description: data.description,
          url: data.url,
          logo: data.logo,
          sameAs: data.sameAs
        };
      
      default:
        return baseSchema;
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(generateSchema())}
      </script>
    </Helmet>
  );
};

export default StructuredData;
