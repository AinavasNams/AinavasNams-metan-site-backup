'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export default function SEOHead({ 
  title, 
  description, 
  keywords, 
  ogImage,
  noIndex = false 
}: SEOHeadProps) {
  const pathname = usePathname();
  
  useEffect(() => {
    console.log('SEOHead setting up for path:', pathname);
    
    // Set canonical URL
    const canonicalUrl = `https://www.metan.lv${pathname}`;
    
    // Remove existing canonical if exists
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }
    
    // Add new canonical
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = canonicalUrl;
    document.head.appendChild(canonical);
    
    // Update title if provided
    if (title) {
      document.title = title;
    }
    
    // Update meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }
    
    // Update meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }
    
    // Update robots meta
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 
      noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
    );
    
    // Update Open Graph URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', canonicalUrl);
    
    // Update Open Graph title
    if (title) {
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', title);
    }
    
    // Update Open Graph description
    if (description) {
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
      }
      ogDesc.setAttribute('content', description);
    }
    
    // Update Open Graph image
    if (ogImage) {
      let ogImg = document.querySelector('meta[property="og:image"]');
      if (!ogImg) {
        ogImg = document.createElement('meta');
        ogImg.setAttribute('property', 'og:image');
        document.head.appendChild(ogImg);
      }
      ogImg.setAttribute('content', ogImage);
    }
    
    console.log('SEO metadata updated for:', canonicalUrl);
  }, [pathname, title, description, keywords, ogImage, noIndex]);
  
  return null; // This component doesn't render anything
}

// Helper function for generating SEO metadata (for compatibility)
export function generateSEOMetadata(options: {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  noIndex?: boolean;
}) {
  return {
    title: options.title,
    description: options.description,
    keywords: options.keywords,
    robots: options.noIndex ? 'noindex, nofollow' : 'index, follow',
    canonical: options.canonical,
    openGraph: {
      title: options.title,
      description: options.description,
      url: options.canonical,
      images: options.ogImage ? [options.ogImage] : undefined,
    },
  };
}

// Structured data component (for compatibility)
export function SEOStructuredData({ data }: { data: any }) {
  console.log('SEOStructuredData rendered with data:', data);
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}