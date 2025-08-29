export const generateMetaTags = (content) => {
  return `
    <meta name="description" content="${content.description || 'Default description'}" />
    <meta name="keywords" content="SEO, Schema, OG Tags" />
    <meta name="robots" content="index, follow" />
  `;
};

export const generateOGTags = (content) => {
  return `
    <meta property="og:title" content="${content.title}" />
    <meta property="og:description" content="${content.description}" />
    <meta property="og:image" content="${content.images[0] || 'https://example.com/default.jpg'}" />
    <meta property="og:url" content="${window.location.href}" />
  `;
};
