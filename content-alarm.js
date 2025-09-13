// content-alarm.js

(function() {
  // Avoid playing multiple alarms if already playing
  if (window.__distractionAlarmPlaying) return;
  window.__distractionAlarmPlaying = true;

  const audio = new Audio(chrome.runtime.getURL("Alarm.mp3"));
  audio.volume = 1.0; // Full volume
  audio.play().catch(err => console.warn("Alarm failed to play:", err));

  // Reset the flag once audio ends
  audio.onended = () => {
    window.__distractionAlarmPlaying = false;
  };
})();
