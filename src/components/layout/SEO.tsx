import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function SEO({ 
  title, 
  description, 
  image = '/og-preview.png',
  url = import.meta.env.VITE_SITE_URL || 'http://localhost:5173' 
}: SEOProps) {
  useEffect(() => {
    const baseTitle = 'DevSignal | Developer Intelligence';
    const fullTitle = title ? `${title} | DevSignal` : baseTitle;
    
    // Update Document Title
    document.title = fullTitle;

    // Update Meta Tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      let element = document.querySelector(isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) element.setAttribute('property', name);
        else element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    if (description) {
      updateMeta('description', description);
      updateMeta('og:description', description, true);
      updateMeta('twitter:description', description);
    }

    if (title) {
      updateMeta('og:title', fullTitle, true);
      updateMeta('twitter:title', fullTitle);
    }

    if (image) {
      updateMeta('og:image', image, true);
      updateMeta('twitter:image', image);
    }

    if (url) {
      updateMeta('og:url', url, true);
      updateMeta('twitter:url', url);
    }

  }, [title, description, image, url]);

  return null;
}
