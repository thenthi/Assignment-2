/*This section was based on an example provided in class. 
From this example, I understood that the audio variable is stored so it can be reused multiple times throughout the script, making the code cleaner and easier to manage. */

const audio = document.querySelector("#custom-audio-player");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar-fill");
const progressContainer = document.querySelector(".progress-bar");
audio.removeAttribute("controls");

/*In this part, I understood that if the audio is paused or has ended, the audio will start playing using audio.play(), 
and the button icon will change to the pause icon. On the other hand, if the audio is currently playing, the audio will pause using audio.pause(), 
and the icon will change back to the play icon. At first, I found this slightly confusing because the image file names made it easy to misunderstand the difference between the audio state and the button’s function. */

//playPauseBtn.addEventListener("click", togglePlayPause);
audio.addEventListener("timeupdate", updateProgressBar);
function togglePlayPause() {
  if (audio.paused || audio.ended) {
    audio.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    audio.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}

/*In this progress bar section, I understood that the first line is used to check whether the audio has fully loaded or not. 
If the audio does not yet have a valid duration, the function will stop running to prevent errors from happening.
The next two lines are used to calculate the percentage of the audio that has already been played and update the width of the progress bar based on that percentage value.
Because of this, the progress bar extends further as the audio continues playing. This part was also explained in class, so it was not too difficult for me to understand.*/

function updateProgressBar() {
  if (!Number.isFinite(audio.duration)) return;

  const value = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = value + "%";
}
// Add other functionalities here

/*These are the three main functions that I created for the audio player: loop, fast-forward, and rewind. 
I used ChatGPT to help explain this part, and I was quite surprised because the logic was actually easier than I expected, 
so it did not take me too much time to understand. Then I follow step by step and fix it base on my knowledge

The line audio.loop is used to enable or disable the loop mode of the audio. 
The next line is used to add or remove a class in order to change the appearance of the loop button when loop mode is active.

Next are the fast-forward and rewind functions. These two functions are quite similar and relatively easy to understand, 
although I accidentally named them the opposite way around, which made it slightly confusing at first. 
The rewind function is used to move the audio backward by 10 seconds. 
The Math.max() function is used to ensure that the audio time does not go below 0, preventing possible errors.
Similarly, the fast-forward function is used to move the audio forward by 10 seconds. 
The Math.min() function helps ensure that the audio time does not go beyond the total duration of the track.*/

//loop sound
const loopSound = document.querySelector("#loop-sound");
function toggleLoop() {
  audio.loop = !audio.loop;
  loopSound.classList.toggle("is-active", audio.loop);
}

//fast-forward
function toggleFast() {
  audio.currentTime = Math.max(0, audio.currentTime - 10);
}

//rewind
function toggleSlow() {
  audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
}

/* For the mute and unmute section, I wrote this part mostly by myself based on the play and pause example that was already provided above.
I thought the logic was quite similar, so I tried to recreate the functionality on my own while also applying some of the JavaScript knowledge that 
I learned in class. Through this part, I understood more about how audio properties work and how button interactions can be connected to changing audio states and icons.*/

//mute-unmue
const onOffSound = document.querySelector("#on-off-sound");
const onOffImg = document.querySelector("#on-off-img");
audio.removeAttribute("controls");
//onOffsound.addEventLisrener("click", toggleOnOff);
function toggleOnOff() {
  if (audio.muted) {
    audio.muted = false;
    audio.volume = 1;
    volumeSlider.value = 100;
    onOffImg.src = "https://img.icons8.com/?size=100&id=641&format=png&color=000000";
  } else {
    audio.muted = true;
    volumeSlider.value = 0;
    onOffImg.src = "https://img.icons8.com/?size=100&id=7900&format=png&color=000000";
  }
}

/* For the volume slider section, I watched a tutorial on YouTube and followed the steps to implement it. 
I thought the logic was quite similar to the mute and unmute function, but the way the variables were connected felt slightly more complicated at first.*/

/* From this part, I also learned that audio.volume only accepts values between 0 and 1, so audio.volume = volumeSlider.value / 100; is used to convert the slider value into the correct range.

I also learned that volumeSlider.addEventListener("input", () => { ... }) is used to detect changes while the user drags the slider, allowing the audio volume to update smoothly in real time.*/

//volumeslider
const volumeSlider = document.querySelector("#volume-slider");
audio.volume = volumeSlider.value / 100;
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value / 100;

  if (audio.volume === 0) {
    audio.muted = true;
    onOffImg.src = "https://img.icons8.com/?size=100&id=7900&format=png&color=000000";
  } else {
    audio.muted = false;
    onOffImg.src = "https://img.icons8.com/?size=100&id=641&format=png&color=000000";
  }
});

/* The sound buttons below were also relatively simple because their logic was quite similar to the play/pause button from the section above. 
Since I already understood how that function worked, I was able to write these functions by myself without too much difficulty, and it did not take me too much time to complete them. */

//rainysound
const rainyAudio = document.querySelector("#rainy-audio");
const rainyBtn = document.querySelector("#rainy-sound");
const rainyVolume = document.querySelector("#rainy-volume");
//rainysound.addEventListener("click", toggleRainy);
function toggleRainy() {
  if (rainyAudio.paused) {
    rainyAudio.play(); 
    rainyBtn.classList.add("active");
  } else {
    rainyAudio.pause();
    rainyBtn.classList.remove("active");
  }
}
rainyVolume.addEventListener("input", () => {
  rainyAudio.volume =
    rainyVolume.value / 100;
})


//thunderstromsound
const thunderstormAudio = document.querySelector("#thunderstorm-audio");
const thunderstormBtn = document.querySelector("#thunderstorm-sound");
const thunderstormVolume = document.querySelector("#thunderstorm-volume");
//thunderstormsound.addEventListener("click", toggleThunderstorm);
function toggleThunderstorm() {
  if (thunderstormAudio.paused) {
    thunderstormAudio.play(); 
    thunderstormBtn.classList.add("active");
  } else {
    thunderstormAudio.pause();
    thunderstormBtn.classList.remove("active");
  }
}
thunderstormVolume.addEventListener("input", () => {
  thunderstormAudio.volume =
    thunderstormVolume.value / 100;
})

//oceanwavesound
const oceanAudio = document.querySelector("#ocean-audio");
const oceanBtn = document.querySelector("#ocean-sound");
const oceanVolume = document.querySelector("#ocean-volume");
//oceansound.addEventListener("click", toggleOcean);
function toggleOcean() {
  if (oceanAudio.paused) {
    oceanAudio.play(); 
    oceanBtn.classList.add("active");
  } else {
    oceanAudio.pause();
    oceanBtn.classList.remove("active");
  }
}
oceanVolume.addEventListener("input", () => {
  oceanAudio.volume =
    oceanVolume.value / 100;
})

//forestsound
const forestAudio = document.querySelector("#forest-audio");
const forestBtn = document.querySelector("#forest-sound");
const forestVolume = document.querySelector("#forest-volume");
//oceansound.addEventListener("click", toggleForest);
function toggleForest() {
  if (forestAudio.paused) {
    forestAudio.play(); 
    forestBtn.classList.add("active");
  } else {
    forestAudio.pause();
    forestBtn.classList.remove("active");
  }
}
forestVolume.addEventListener("input", () => {
  forestAudio.volume =
    forestVolume.value / 100;
})

//leafsound
const leafAudio = document.querySelector("#leaf-audio");
const leafBtn = document.querySelector("#leaf-sound");
const leafVolume = document.querySelector("#leaf-volume");
//oceansound.addEventListener("click", toggleLeaf);
function toggleLeaf() {
  if (leafAudio.paused) {
    leafAudio.play(); 
    leafBtn.classList.add("active");
  } else {
    leafAudio.pause();
    leafBtn.classList.remove("active");
  }
}
leafVolume.addEventListener("input", () => {
  leafAudio.volume =
    leafVolume.value / 100;
})

//firesound
const fireAudio = document.querySelector("#fire-audio");
const fireBtn = document.querySelector("#fire-sound");
const fireVolume = document.querySelector("#fire-volume");
//oceansound.addEventListener("click", toggleFire);
function toggleFire() {
  if (fireAudio.paused) {
    fireAudio.play(); 
    fireBtn.classList.add("active");
  } else {
    fireAudio.pause();
    fireBtn.classList.remove("active");
  }
}
fireVolume.addEventListener("input", () => {
  fireAudio.volume =
    fireVolume.value / 100;
})

//pianosound
const pianoAudio = document.querySelector("#piano-audio");
const pianoBtn = document.querySelector("#piano-sound");
const pianoVolume = document.querySelector("#piano-volume");
//oceansound.addEventListener("click", toggleForest);
function togglePiano() {
  if (pianoAudio.paused) {
    pianoAudio.play(); 
    pianoBtn.classList.add("active");
  } else {
    pianoAudio.pause();
    pianoBtn.classList.remove("active");
  }
}
pianoVolume.addEventListener("input", () => {
  pianoAudio.volume =
    pianoVolume.value / 100;
})

//nightsound
const nightAudio = document.querySelector("#night-audio");
const nightBtn = document.querySelector("#night-sound");
const nightVolume = document.querySelector("#night-volume");
//oceansound.addEventListener("click", toggleNight);
function toggleNight() {
  if (nightAudio.paused) {
    nightAudio.play(); 
    nightBtn.classList.add("active");
  } else {
    nightAudio.pause();
    nightBtn.classList.remove("active");
  }
}
nightVolume.addEventListener("input", () => {
  nightAudio.volume =
    nightVolume.value / 100;
})

/* This section was more difficult for me compared to the previous audio functions because it involved dragging interactions and multiple event listeners working together. 
The main purpose of this section is to allow users to drag the progress bar to change the playback position of the audio. 
Because of this, I watched tutorials on YouTube and also used ChatGPT several times to help fix the code when it was not working properly.

The first line is used to check whether the user is currently dragging the progress bar or not. When the user starts dragging, the value becomes true, and when the interaction ends, 
it changes back to false.*/

//seekslider
let isSeeking = false;

/* The function getSeekPercent(e) is used to calculate the position of the user’s pointer on the progress bar. 
In this function, getBoundingClientRect() is used to get the size and position of the progress bar on the screen. 
After that, the code calculates the distance between the pointer and the left side of the bar. 
The two functions Math.max() and Math.min() are used to make sure the value does not go outside the range of the progress bar. */

function getSeekPercent(e) {
  const rect = progressContainer.getBoundingClientRect();
  const position = e.clientX - rect.left;
  return Math.max(0, Math.min(1, position / rect.width));
}

/* Next, the function seekToPointer(e) is used to change the playback time of the audio. 
It first checks whether the audio already has a valid duration to avoid possible errors. 
After that, the percentage value from getSeekPercent(e) is used to calculate the new playback time using audio.currentTime. 
At the same time, the progress bar and timestamp are also updated immediately so the interface changes in real time while the user drags the progress bar. */

function seekToPointer(e) {
  if (!Number.isFinite(audio.duration)) return;

  const percent = getSeekPercent(e);
  audio.currentTime = percent * audio.duration;
  progressBar.style.width = percent * 100 + "%";
  currentTimeText.textContent = formatTime(audio.currentTime);
}

/* The event listeners such as pointerdown, pointermove, and pointerup are used to track each stage of the dragging interaction. 
Although this part was quite confusing for me at first, after spending time reading through the code carefully and asking ChatGPT to explain it, 
I was eventually able to understand the purpose and function of these lines of code. */

progressContainer.addEventListener("pointerdown", (e) => {
  isSeeking = true;
  progressContainer.classList.add("is-seeking");
  progressContainer.setPointerCapture(e.pointerId);
  seekToPointer(e);
});

progressContainer.addEventListener("pointermove", (e) => {
  if (!isSeeking) return;
  seekToPointer(e);
});

progressContainer.addEventListener("pointerup", (e) => {
  if (!isSeeking) return;
  isSeeking = false;
  progressContainer.classList.remove("is-seeking");
  progressContainer.releasePointerCapture(e.pointerId);
  seekToPointer(e);
});

progressContainer.addEventListener("pointercancel", () => {
  isSeeking = false;
  progressContainer.classList.remove("is-seeking");
});

/* In this section, I also watched a tutorial on YouTube because my code was not working properly at first, 
so I asked ChatGPT to help check and fix it. After that, I removed some unnecessary parts and adjusted the code to make it easier for me to understand.

First, the formatTime() function is used to convert the audio time into a different format. 
In this function, Math.floor(time / 60) is used to calculate the minutes, while Math.floor(time % 60) is used to calculate the remaining seconds. 
After that, padStart(2, "0") is used to make sure the numbers always display with two digits. */

//timestamp
const currentTimeText = document.querySelector("#curtimetext");
const durationText = document.querySelector("#durtimetext");

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return (
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0")
  );
}

/* Lastly, the two event listeners below are used to update the audio timestamp. loadedmetadata is used to check when the audio information has fully loaded and then display the total duration of the track on the screen. 
Meanwhile, timeupdate is used to continuously update the current playback time based on the current position of the audio. */

audio.addEventListener("loadedmetadata", () => {
  durationText.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  currentTimeText.textContent = formatTime(audio.currentTime);
});

/* This section was also one of the more difficult parts for me because I could not find a suitable tutorial on YouTube. 
I used ChatGPT to help create this feature, but at first it did not work the way I wanted, so I spent quite a lot of time adjusting and testing the code. Then follow the steps and rewrited it by myself

The first line, let isFocusMode = false;, is used to check whether focus mode is currently turned on or off.
 At the beginning, the value is false, which means focus mode is not active. The line isFocusMode = !isFocusMode; is used to switch the state between on and off. */

//Focus mode
let isFocusMode = false;

function toggleFocusMode() {
  const overlay = document.querySelector("#focus-overlay");
  const focusBtn = document.querySelector("#focus-btn");
  const focusBtnText = document.querySelector(".focus-btn-text");

  isFocusMode = !isFocusMode;

/* Next, overlay.classList.toggle(...) is used to show or hide the overlay of focus mode. After that, document.body.classList.toggle(...) is used to add or remove a class on the body in order to change the website interface when focus mode is active.

Lastly, focusBtn.setAttribute(...) is used to update the state of the focus button for accessibility, while focusBtnText.textContent ... is used to change the text displayed on the focus mode button between “Focus” and “Exit focus”. */

  overlay.classList.toggle("hidden", !isFocusMode);
  document.body.classList.toggle("is-focus-mode", isFocusMode);
  focusBtn.setAttribute("aria-pressed", String(isFocusMode));
  focusBtnText.textContent = isFocusMode ? "Exit focus" : "Focus";
}

/* This section was one of the easier parts for me because I had already become familiar with how the previous buttons and audio controls worked. 
Because of that, it was not too difficult for me to create this part. 
I used the knowledge from class examples as well as the previous functions above to help me understand the logic and write the start, skip, and end buttons below by myself. */

//back to start
function toggleStart() {
  audio.currentTime = 0;
}

//next part 2
function toggleNext () {
  audio.currentTime = audio.duration;
   window.location.href = "study.html"; //This one I have to ask chatGPT that how to connect another page, and I wrote it
}

//back part 1
function toggleBack1 () {
  audio.currentTime = audio.duration;
  window.location.href = "index.html";
}

//back part 2
function toggleBack2 () {
  audio.currentTime = audio.duration;
  window.location.href = "study.html";
}

//next part 1
function toggleNext1 () {
  audio.currentTime = audio.duration;
  window.location.href = "sleep.html";
}

//End
function toggleEnd () {
  audio.currentTime = audio.duration;
}

//bg-video1
const bgVideo2 = document.querySelector("#bg-video2");
const relaxBackgrounds = [
  "relax.mp4",
  "relax1.mp4",
  "relax2.mp4",
];
let currentRelaxBg = 0;
function nextRelaxBackground() {
  currentRelaxBg++;
  if (currentRelaxBg >= relaxBackgrounds.length) {
    currentRelaxBg = 0;
  }
  bgVideo2.src = relaxBackgrounds[currentRelaxBg];
  bgVideo2.load();
  bgVideo2.play();
}

//bg-video2
const bgVideo1 = document.querySelector("#bg-video1");
const studyBackgrounds = [
  "study.mp4",
  "study1.mp4",
  "study2.mp4",
];
let currentStudyBg = 0;
function nextStudyBackground() {
  currentStudyBg++;
  if (currentStudyBg >= studyBackgrounds.length) {
    currentStudyBg = 0;
  }
  bgVideo1.src = studyBackgrounds[currentStudyBg];
  bgVideo1.load();
  bgVideo1.play();
}

//bg-video3
const bgVideoo = document.querySelector("#bg-video2");
const backgrounds = [
 "sleep.mp4",
 "backgroundstudy.mp4",
 "sleep1.mp4",
];
let currentBg = 0;
function nextBackground() {
  currentBg++;
  if (currentBg >= backgrounds.length) {
    currentBg = 0;
  }

//change video1
  bgVideoo.src = backgrounds[currentBg];
  bgVideoo.load();
  bgVideoo.play();
}