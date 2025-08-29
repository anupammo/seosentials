document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["schemaType", "useDummyData"], (data) => {
    document.getElementById("schemaType").value = data.schemaType || "Article";
    document.getElementById("useDummyData").checked = data.useDummyData || false;
  });

  document.getElementById("saveBtn").addEventListener("click", () => {
    const schemaType = document.getElementById("schemaType").value;
    const useDummyData = document.getElementById("useDummyData").checked;

    chrome.storage.sync.set({ schemaType, useDummyData }, () => {
      alert("Settings saved!");
    });
  });
});
