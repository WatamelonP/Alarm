# Herta Anti-Distraction Alarm
#### Video Demo:  <https://youtu.be/zO7MK5nViSs>
#### Description: This is a Chrome extension where it plays a sound for a minute every time the user opens a tab that can serve as a distraction. The user can designate a URL as a distraction by adding the URL as a bookmark inside the automatically generated bookmarks tab. This is an extension that only works if the user wants to help themself.

#### Instructions on how to use:
#### 1st:
#### go to the extensions tabs. you can access this by clicking the puzzle looking piece at the right side of the search bar.
#### 2nd:
#### Turn developer mode on, and click load unpacked.
#### 3rd:
#### Click the folder itself(going in the folder might only show the lottiefile but dont go there and just open the folder itself)
#### 4th:
#### After implementing, go and check the bookmarks tabs to see if the automatically generated "Distractions" tab is there.
#### 5th:
#### Add a URL you consider a distraction there or go to the URL itself and bookmark it(be sure to select the Distractions tab!)

#### And it's done. Everytime you visit a site in that bookmarks tab, you will get a popup of madam herta bonking you urging you to focus, with an "alarm".


#### manifest.json:
#### contains permissions, icons, resources used, and actions such as the popup

#### offscreen.html:
#### accidentally swapped this and the popup.html... too tired to swap, nothing really changes.(ill proabbly be confused later on) uses the 

#### popup.html:
#### same as offscreen, just for the window this time. this is the window that popsup whenever you trigger the alarm.

#### offscreen.js:
#### basically has the functions to play the sound, and the function to pause it if the tab gets closed(condition on the other )

#### background.js: 
#### the backbone. generates the "distraction" tab upon implementation, checks the current open tabs, activates the alarm upon meeting the conditions. this one was the most chaotic part of the system because at the first 3 days, i had the function names that are either so similar to each other, or something incomprehensible the day after. i had to ask copilot to change the names to something more appropriate, since it probably knew the context. but ye when i tried manually changing the names, it broke every single time. this took me the most time to make because of me, myself, and i.

#### Herta.json:
#### The lottie file i used. GIFS are too low quality when i tried it but lottie does the work. this one took me the most prompts since all of the examples ive seen are mostly used within react. it took me a while to know how to implement it such as it being unable without the lottie-player.js being within the same folder(cant run with it being online.)

#### Credits:
#### Honkai Star Rail's Herta and The Herta ingame voicelines, and sticker.
#### I cant find the original edit of the alarm sound. mightve been deleted or privated in youtube.


#### References used:
#### https://github.com/swantzter/crx-falling-metal-pipe
#### https://github.com/engelsjk/chrome-extension-request-audio
#### https://stackoverflow.com/questions/14834520/html5-audio-stop-function


#### Tools used:
#### GPT: mainly for catching errors and fixing wrong syntax. most of the codes i used are from me piecing things together from other repositories such as the ones above.
#### Copilot: basically style50 lol(and implementing lottie. this took me the most prompts. barely just fixing with it mentioning that i cant run this without the lottie runner file being within folder.)
#### Lottie: Used this to animate the sticker i used.


#### Comments:
#### Error handling in javascript is such a pain. i cant even tell if im doing something wrong even though it's working. Wouldve never thought the things i originally wanted to  do wasnt possible to do due to restrictions.
#### The project ended a lot faster because the things i wanted to implement are actually easy to implement thanks to google.
#### The important functions of this extension is just reading and loading of the bookmarks folder, reading the current open tabs, and generating a bookmarks folder(didnt think this was possible to be honest. i thought this would be restricted.) What took me the most time to make was the popup. i kept forcing it to open using conditions but i didnt know that wasnt possible until i asked gpt haha(wasted hours because of that)

#### The character i used is The Herta from Honkai StarRail. As for why i used her, it's because i thought it would suit her character pretty well. I initially wanted to make a more professional extension, one without such characters, and simply use a loud alarm sound, but i thought that would be boring, so i changed it midway.
