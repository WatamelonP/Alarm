Herta Anti-Distraction Alarm

Video Demo

https://youtu.be/zO7MK5nViSs￼

Description

Herta Anti-Distraction Alarm is a Chrome extension that plays a one-minute “alarm” whenever you open a website you’ve marked as a distraction.
You can designate distraction sites by adding them as bookmarks inside an automatically generated “Distractions” folder.

This extension only works if you choose to help yourself — it won’t stop you from removing bookmarks. Herta will simply bonk you when you open sites you promised not to visit.

⸻

📌 How to Install & Use

1. Open the Chrome extensions page

Click the puzzle-piece icon beside the address bar → choose Manage Extensions.

2. Enable Developer Mode

Toggle Developer mode on (top right).

3. Click Load unpacked

Select the extension folder itself.
(Do not open the folder — just select it directly.)

4. Verify the Distractions folder

Open your Bookmarks and confirm that an automatically generated folder named “Distractions” appears.

5. Add distraction sites

Bookmark any distracting URL, and make sure the bookmark’s folder is set to Distractions.

⸻

🎉 Done!

Whenever you visit a URL inside that folder, Herta will pop up and bonk you, accompanied by the alarm sound.

⸻

📂 File Overview

manifest.json

Contains permissions, icons, linked resources, extension actions, and popup definitions.

offscreen.html

This accidentally ended up swapped with popup.html, but functionally nothing breaks.
(Yes, I’ll probably confuse myself later.)

popup.html

Displays the popup window that appears when you trigger the alarm.

offscreen.js

Responsible for playing and pausing audio.
It pauses the alarm when the tab is closed.

background.js

The core logic of the extension. It:
	•	Creates the Distractions bookmark folder
	•	Checks active tabs
	•	Triggers the alarm based on conditions

This was the most chaotic part because I had confusing function names for the first few days. Copilot renamed them for me because every time I did it manually, everything broke. This file took me the most time because of me, myself, and I.

Herta.json

The Lottie animation file used for the popup.
GIFs were too low-quality, so Lottie was the better option.
This part took a lot of prompts because most examples online assume a React setup.
Also, it requires the lottie-player.js to be local — cannot load from a CDN.

⸻

🙏 Credits
	•	Herta (Honkai: Star Rail) — character, voicelines, sticker
	•	Alarm sound — original edit source unknown (likely deleted or privated on YouTube)

⸻

🔗 References
	•	https://github.com/swantzter/crx-falling-metal-pipe
	•	https://github.com/engelsjk/chrome-extension-request-audio
	•	https://stackoverflow.com/questions/14834520/html5-audio-stop-function

⸻

🛠 Tools Used
	•	GPT — for debugging, syntax checking, and combining ideas from samples
	•	Copilot — basically my style50, also helped me integrate Lottie
	•	Lottie — for animating the sticker

⸻

💬 Comments
	•	Error handling in JavaScript feels like suffering. Sometimes it “works” but also “doesn’t”, and I have no idea why.
	•	The project finished faster than expected because most features were surprisingly easy thanks to Google.
	•	The main tasks were:
	•	Reading & loading bookmarks
	•	Reading current tabs
	•	Generating a bookmarks folder (didn’t think Chrome allowed this!)
	•	The popup took the longest to figure out. I kept trying to force it to open in ways Chrome simply does not allow. GPT saved me after many wasted hours.
	•	I originally wanted a professional version with no characters and just a loud alarm… but that was boring.
So I chose The Herta, because her personality fits perfectly with bonking distracted users
