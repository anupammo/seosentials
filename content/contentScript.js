(() => {
  const getMetaTags = () => {
    const metas = [...document.getElementsByTagName("meta")];
    return metas.map(meta => ({
      name: meta.getAttribute("name") || meta.getAttribute("property"),
      content: meta.getAttribute("content")
    }));
  };

  const getSchemaScripts = () => {
    const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')];
    return schemas.map(script => script.innerText.trim());
  };

  const getPageContent = () => ({
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content || "",
    images: [...document.images].map(img => img.src).filter(Boolean),
    headings: [...document.querySelectorAll("h1, h2")].map(h => h.textContent.trim())
  });

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "extractPageData") {
      sendResponse({
        metaTags: getMetaTags(),
        schemaTags: getSchemaScripts(),
        pageContent: getPageContent()
      });
    }
  });
})();
