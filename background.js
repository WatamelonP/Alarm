let distractionUrls = [];

// 1. Load all bookmarks from a chosen folder
function loadDistractionBookmarks() {
  chrome.bookmarks.search("Distractions", (results) => {
    distractionUrls = results.map(b => b.url).filter(u => u);
    console.log("Loaded distraction URLs:", distractionUrls);
  });
}

// 2. Check active tab when it changes
chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    checkTab(tab.url);
  });
});

// 3. Also check when a tab updates (e.g., user types in URL)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    checkTab(tab.url);
  }
});

// 4. Compare tab URL against distraction list
function checkTab(url) {
  if (!url) return;
  if (distractionUrls.some(dUrl => url.includes(dUrl))) {
    playAlarm();
  }
}

// 5. Play alarm
function playAlarm() {
  let audio = new Audio(chrome.runtime.getURL("Alarm.mp3"));
  audio.play();
}

// Load bookmarks at startup
loadDistractionBookmarks();
