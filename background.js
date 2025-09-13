let distractionUrls = [];
let distractionTabIds = new Set();

// Create 'Distractions' folder if missing
chrome.runtime.onInstalled.addListener(() => {
  chrome.bookmarks.search({ title: "Distractions" }, (results) => {
    const folderExists = results.some(b => !b.url && b.title === "Distractions");
    if (!folderExists) {
      chrome.bookmarks.create({ title: "Distractions" }, (newFolder) => {
        console.log("Created 'Distractions' folder:", newFolder);
        loadDistractionBookmarks();
      });
    } else {
      console.log("'Distractions' folder already exists.");
      loadDistractionBookmarks();
    }
  });
});

function loadDistractionBookmarks() {
  chrome.bookmarks.search({ title: "Distractions" }, (results) => {
    const folder = results.find(b => !b.url && b.title === "Distractions");
    if (!folder) {
      distractionUrls = [];
      console.log("No 'Distractions' folder found.");
      return;
    }
    chrome.bookmarks.getChildren(folder.id, (children) => {
      distractionUrls = children
        .filter(b => b.url)
        .map(b => {
          try {
            return new URL(b.url).hostname.replace(/^www\./, "");
          } catch (e) {
            console.warn("Skipped invalid bookmark URL:", b.url);
            return null;
          }
        })
        .filter(Boolean);
      console.log("Loaded distraction URLs:", distractionUrls);
    });
  });
}

// Keep bookmarks in sync
chrome.bookmarks.onCreated.addListener(loadDistractionBookmarks);
chrome.bookmarks.onRemoved.addListener(loadDistractionBookmarks);
chrome.bookmarks.onChanged.addListener(loadDistractionBookmarks);

async function ensureOffscreenDocument() {
  // Chrome 114+ supports this check
  if (chrome.offscreen.hasDocument) {
    const existing = await chrome.offscreen.hasDocument();
    if (existing) return;
  }

  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: ["AUDIO_PLAYBACK"],
    justification: "Play alarm sound when distraction detected"
  });
}

async function playAlarm() {
  try {
    await ensureOffscreenDocument();
    chrome.runtime.sendMessage({ action: "play-alarm" });
  } catch (err) {
    console.error("Failed to play alarm:", err);
  }
}

function checkTabForDistraction(tabId, url) {
  if (!url || distractionUrls.length === 0) {
    distractionTabIds.delete(tabId);
    maybeStopAlarm();
    return;
  }
  try {
    const tabHostname = new URL(url).hostname.replace(/^www\./, "");
    if (distractionUrls.some(host => tabHostname.endsWith(host))) {
      distractionTabIds.add(tabId);
      console.log("🚨 Distraction detected:", url);
      playAlarm(tabId);
    } else {
      distractionTabIds.delete(tabId);
      maybeStopAlarm();
    }
  } catch (e) {
    distractionTabIds.delete(tabId);
    maybeStopAlarm();
    console.warn("Invalid tab URL:", url);
  }
}

function maybeStopAlarm() {
  if (distractionTabIds.size === 0) {
    chrome.runtime.sendMessage({ action: "stop-alarm" });
  }
}


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") checkTabForDistraction(tabId, tab.url);
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  distractionTabIds.delete(tabId);
  maybeStopAlarm();
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (chrome.runtime.lastError || !tab) return;
    checkTabForDistraction(tab.id, tab.url);
  });
});

// Check current active tab on startup
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs[0]) checkTabForDistraction(tabs[0].id, tabs[0].url);
});

// Load bookmarks initially
loadDistractionBookmarks();
