export function parsePageContent() {
  const metaTags = {};
  const ogTags = {};
  const schemaScripts = [];

  // Meta tags
  document.querySelectorAll("meta").forEach((tag) => {
    const name = tag.getAttribute("name");
    const property = tag.getAttribute("property");
    const content = tag.getAttribute("content");

    if (name) metaTags[name] = content;
    if (property && property.startsWith("og:")) ogTags[property] = content;
  });

  // Schema.org JSON-LD
  document.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
    try {
      const json = JSON.parse(script.textContent);
      schemaScripts.push(json);
    } catch (e) {
      console.warn("Invalid JSON-LD:", e);
    }
  });

  return { metaTags, ogTags, schemaScripts };
}
