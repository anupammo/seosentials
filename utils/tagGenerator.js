
export const generateMetaTags = (content) => {
  return `
<!-- Primary Meta Tags -->
<title>${content.title || ''}</title>
<meta name="title" content="${content.title || ''}" />
<meta name="description" content="${content.description || 'Default description'}" />
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${content.url || window.location.href}" />
<meta property="og:title" content="${content.title || ''}" />
<meta property="og:description" content="${content.description || 'Default description'}" />
<meta property="og:image" content="${content.images && content.images[0] ? content.images[0] : 'https://example.com/default.jpg'}" />
<!-- X (Twitter) -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${content.url || window.location.href}" />
<meta property="twitter:title" content="${content.title || ''}" />
<meta property="twitter:description" content="${content.description || 'Default description'}" />
<meta property="twitter:image" content="${content.images && content.images[0] ? content.images[0] : 'https://example.com/default.jpg'}" />
<!-- Meta Tags Generated with Google Chrome Extension developed by https://anupammondal.in -->
`;
};

export const generateOGTags = (content) => {
  return `
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${content.url || window.location.href}" />
<meta property="og:title" content="${content.title || ''}" />
<meta property="og:description" content="${content.description || 'Default description'}" />
<meta property="og:image" content="${content.images && content.images[0] ? content.images[0] : 'https://example.com/default.jpg'}" />
<!-- X (Twitter) -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${content.url || window.location.href}" />
<meta property="twitter:title" content="${content.title || ''}" />
<meta property="twitter:description" content="${content.description || 'Default description'}" />
<meta property="twitter:image" content="${content.images && content.images[0] ? content.images[0] : 'https://example.com/default.jpg'}" />
<!-- Meta Tags Generated with Google Chrome Extension developed by https://anupammondal.in -->
`;
};
