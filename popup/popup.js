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


      const allMeta = ["description", "keywords", "robots"];
      const allOG = ["og:title", "og:description", "og:image", "og:url"];
      const foundMeta = (metaTags || []).map(t => t.name);
      const foundOG = (metaTags || []).map(t => t.name);
      const metaList = allMeta.map(tag =>
        foundMeta.includes(tag)
          ? `<li style='color:green;'>✔ ${tag}</li>`
          : `<li style='color:red;'>✖ ${tag}</li>`
      ).join("");
      const ogList = allOG.map(tag =>
        foundOG.includes(tag)
          ? `<li style='color:green;'>✔ ${tag}</li>`
          : `<li style='color:red;'>✖ ${tag}</li>`
      ).join("");
      const results = `
        <div class="card">
          <h3>Meta Tags</h3>
          <ul>${metaList}</ul>
          <h3>OG Tags</h3>
          <ul>${ogList}</ul>
          <h3>Schema Status: ${schemaCheck === 'present' ? '<span style="color:green;">✔ Found</span>' : '<span style="color:red;">✖ Missing</span>'}</h3>
        </div>
        <div class="card">
          <h3>Generated Meta Tags</h3>
          <pre id="metaCode">${escapeHtml(generatedMeta)}</pre>
          <button class="copyBtn" id="copyMeta">Copy Meta Tags</button>
          <span class="copyInfo" id="metaCopied" style="display:none;color:green;margin-left:10px;">Code Copied!</span>
        </div>
        <div class="card">
          <h3>Generated Schema (${schemaType})</h3>
          <pre id="schemaCode">${generatedSchema}</pre>
          <button class="copyBtn" id="copySchema">Copy Schema</button>
          <span class="copyInfo" id="schemaCopied" style="display:none;color:green;margin-left:10px;">Code Copied!</span>
        </div>
      `;
      document.getElementById("results").innerHTML = results;

      // Add copy listeners after rendering
      document.getElementById("copyMeta").addEventListener("click", () => {
        navigator.clipboard.writeText(generatedMeta);
        const info = document.getElementById("metaCopied");
        info.style.display = "inline";
        setTimeout(() => { info.style.display = "none"; }, 1200);
      });
      // Removed OG copy button listener since OG section is not present
      document.getElementById("copySchema").addEventListener("click", () => {
        navigator.clipboard.writeText(generatedSchema);
        const info = document.getElementById("schemaCopied");
        info.style.display = "inline";
        setTimeout(() => { info.style.display = "none"; }, 1200);
      });
    });
  });
});
