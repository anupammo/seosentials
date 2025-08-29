function escapeHtml(str) {
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
}
import { checkMetaTags, checkSchemaPresence } from "../utils/tagChecker.js";
import { generateMetaTags, generateOGTags } from "../utils/tagGenerator.js";
import { generateSchema } from "../utils/schemaBuilder.js";


let generatedMeta = "";
let generatedOG = "";
let generatedSchema = "";

document.getElementById("scanBtn").addEventListener("click", () => {
  const schemaType = document.getElementById("schemaType").value;
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.sendMessage(tab.id, { action: "extractPageData" }, (response) => {
      if (chrome.runtime.lastError) {
        document.getElementById("results").innerHTML = `<span style="color: red;">Error: Could not connect to content script. Please reload the page and try again.</span>`;
        return;
      }
      if (!response) {
        document.getElementById("results").innerHTML = `<span style="color: red;">Error: No response received. Make sure the content script is running.</span>`;
        return;
      }
      const { metaTags, schemaTags, pageContent } = response;
      const metaCheck = checkMetaTags(metaTags || []);
      const schemaCheck = checkSchemaPresence(schemaTags || []);

  generatedMeta = generateMetaTags(pageContent || "").trim().replace(/^\s+/gm, "");
  generatedOG = generateOGTags(pageContent || "").trim().replace(/^\s+/gm, "");
      generatedSchema = JSON.stringify(generateSchema(schemaType, pageContent || {}), null, 2);

      const results = `
        <div class="card">
          <h3>Missing Meta Tags</h3>
          <ul>${metaCheck.missingMeta.map(tag => `<li>${tag}</li>`).join("")}</ul>
          <h3>Missing OG Tags</h3>
          <ul>${metaCheck.missingOG.map(tag => `<li>${tag}</li>`).join("")}</ul>
          <h3>Schema Status: ${schemaCheck}</h3>
        </div>
        <div class="card">
          <h3>Generated Meta Tags</h3>
            <pre>${escapeHtml(generatedMeta)}</pre>
        </div>
        <div class="card">
          <h3>Generated OG Tags</h3>
            <pre>${escapeHtml(generatedOG)}</pre>
        </div>
        <div class="card">
          <h3>Generated Schema (${schemaType})</h3>
          <pre>${generatedSchema}</pre>
        </div>
      `;
      document.getElementById("results").innerHTML = results;
    });
  });
});

document.getElementById("copyMeta").addEventListener("click", () => {
  navigator.clipboard.writeText(generatedMeta);
});
document.getElementById("copyOG").addEventListener("click", () => {
  navigator.clipboard.writeText(generatedOG);
});
document.getElementById("copySchema").addEventListener("click", () => {
  navigator.clipboard.writeText(generatedSchema);
});
