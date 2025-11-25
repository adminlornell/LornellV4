import { Property } from '../types';

export const generatePropertySchema = (property: Property) => {
  // Strip non-numeric characters except decimal points for the price
  const rawPrice = property.price || '';
  // Assuming price might contain "/SF" or text, we extract the main number if possible, 
  // or just remove currency symbols.
  // For the 'Product' hack, a clean number is best.
  const numericPrice = rawPrice.replace(/[^0-9.]/g, '');

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": property.headline || property.address,
    "image": property.img,
    "description": property.description,
    "offers": {
      "@type": "Offer",
      "price": numericPrice,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "itemOffered": {
        "@type": "Place",
        "name": property.address,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": property.address,
          "addressLocality": property.city,
          "addressRegion": property.state,
          "postalCode": property.zip,
          "addressCountry": "US"
        }
      }
    }
  };
};