export const generateSchema = (type, content) => {
  switch (type) {
    case "Article":
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": content.title,
        "description": content.description,
        "image": content.images && content.images[0] ? content.images[0] : "",
        "author": {
          "@type": "Person",
          "name": content.authorName || "Author Name",
          ...(content.authorUrl ? { "url": content.authorUrl } : {})
        },
        "publisher": {
          "@type": "Organization",
          "name": content.publisherName || "Your Brand",
          "logo": {
            "@type": "ImageObject",
            "url": content.publisherLogo || "https://example.com/logo.png"
          }
        },
        "mainEntityOfPage": window.location.href
      };
    case "Website":
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": content.url || window.location.href,
        "name": content.title || "Website Name",
        "description": content.description || "Website description",
        "publisher": {
          "@type": "Organization",
          "name": content.publisherName || "Your Brand"
        }
      };
    case "Organization":
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "url": content.url || window.location.href,
        "name": content.title || "Organization Name",
        "description": content.description || "Organization description",
        "logo": content.images && content.images[0] ? content.images[0] : "https://example.com/logo.png"
      };
    case "Product":
      return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": content.title || "Product Name",
        "image": content.images && content.images[0] ? content.images[0] : "",
        "description": content.description || "Product description",
        "brand": {
          "@type": "Brand",
          "name": content.brandName || "Brand Name"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": content.priceCurrency || "INR",
          "price": content.price || "0",
          "availability": content.availability || "https://schema.org/InStock",
          "url": content.url || window.location.href
        }
      };
    case "LocalBusiness":
      return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": content.title || "Business Name",
        "image": content.images && content.images[0] ? content.images[0] : "",
        "@id": content.url || window.location.href,
        "url": content.url || window.location.href,
        "telephone": content.telephone || "",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": content.streetAddress || "",
          "addressLocality": content.addressLocality || "",
          "addressRegion": content.addressRegion || "",
          "postalCode": content.postalCode || "",
          "addressCountry": content.addressCountry || "India"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": content.latitude || "",
          "longitude": content.longitude || ""
        },
        "openingHours": content.openingHours || "Mo-Su 09:00-18:00"
      };
    default:
      return {};
  }
};
