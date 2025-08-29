export const checkMetaTags = (tags) => {
  const required = ["description", "keywords", "robots"];
  const ogRequired = ["og:title", "og:description", "og:image", "og:url"];
  const found = tags.map(t => t.name);

  return {
    missingMeta: required.filter(tag => !found.includes(tag)),
    missingOG: ogRequired.filter(tag => !found.includes(tag))
  };
};

export const checkSchemaPresence = (schemas) => {
  return schemas.length > 0 ? "present" : "missing";
};
