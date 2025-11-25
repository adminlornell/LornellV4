import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: Record<string, any>;
}

export const SEO: React.FC<SEOProps> = ({ 
  title = "Lornell Real Estate", 
  description = "The Premier Authority on Commercial Real Estate in Central New England. Specializing in Retail, Industrial, and Multifamily investment sales and leasing.",
  image = "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=2669&auto=format&fit=crop",
  url,
  type = "website",
  schema
}) => {
  const siteTitle = title.includes('Lornell') ? title : `${title} | Lornell Real Estate`;
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  useEffect(() => {
    // Update Title
    document.title = siteTitle;

    // Helper to update meta tags
    const updateMeta = (selector: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        
        // Parse selector to set attributes based on type
        if (selector.includes('name="')) {
            const name = selector.match(/name="([^"]+)"/)?.[1];
            if (name) element.setAttribute('name', name);
        } else if (selector.includes('property="')) {
             const property = selector.match(/property="([^"]+)"/)?.[1];
             if (property) element.setAttribute('property', property);
        }
        
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('meta[name="description"]', description);
    
    // Open Graph
    updateMeta('meta[property="og:title"]', siteTitle);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[property="og:image"]', image);
    updateMeta('meta[property="og:url"]', currentUrl);
    updateMeta('meta[property="og:type"]', type);

    // Twitter - Updated to summary_large_image
    updateMeta('meta[name="twitter:card"]', 'summary_large_image');
    updateMeta('meta[name="twitter:title"]', siteTitle);
    updateMeta('meta[name="twitter:description"]', description);
    updateMeta('meta[name="twitter:image"]', image);
    updateMeta('meta[name="twitter:url"]', currentUrl);

    // Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // JSON-LD Schema
    // Remove any existing LD+JSON scripts to prevent duplication/conflicts
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    if (schema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }

  }, [siteTitle, description, image, currentUrl, type, schema]);

  return null;
};