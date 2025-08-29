export const generateSchema = (type, content) => {
  switch (type) {
    case "Article":
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": content.title,
        "description": content.description,
        "image": content.images[0] || "",
        "author": {
          "@type": "Person",
          "name": "Author Name"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Your Brand",
          "logo": {
            "@type": "ImageObject",
            "url": "https://example.com/logo.png"
          }
        },
        "mainEntityOfPage": window.location.href
      };
    // Add more types like Product, LocalBusiness, etc.
    default:
      return {};
  }
};
