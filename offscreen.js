chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "play-alarm") {
    playSound('Alarm');
  } else if (msg.action === "stop-alarm") {
    stopAllAlarms();
  }
});


function stopAllAlarms() {
  if (sounds.Alarm && Array.isArray(sounds.Alarm.audios)) {
    for (const audio of sounds.Alarm.audios) {
      if (audio && !audio.paused) {
        audio.pause();
        try {
          audio.currentTime = 0;
        } catch (e) {
          if (audio.fastSeek) audio.fastSeek(0);
        }
      }
    }
  }
}

// this from https://github.com/swantzter/crx-falling-metal-pipe
const sounds = {
  Alarm: {
    audios: new Array(50).fill(undefined),
    filename: 'Alarm.mp3',
    idx: 0
  }
}

// got this function from https://github.com/swantzter/crx-falling-metal-pipe
// THANK YOU SO MUCH SWANTZTER FOR YOUR OPEN SOURCE PROJECT I COULDNT HAVE MADE
// THIS PROJECT WITHOUT YOUR HELP
async function playSound(type) {
  if (!(type in sounds)) {
    console.warn(`Attempted to play unknown sound: ${type}`);
    return;
  }
  const { audios, filename, idx } = sounds[type];

  if (!audios[idx]) {
    audios[idx] = new Audio(chrome.runtime.getURL(filename));
    audios[idx].volume = 1.0;
  }

  const alarm = audios[idx];
  sounds[type].idx = idx === audios.length - 1 ? 0 : idx + 1;

  // Always reset before playing
  try {
    alarm.pause();
    alarm.currentTime = 0;
  } catch (e) {
    if (alarm.fastSeek) alarm.fastSeek(0);
  }
  try {
    await alarm.play();
  } catch (err) {
    console.warn("Failed to play alarm:", err);
  }
}
