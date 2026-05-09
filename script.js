const audio = document.querySelector("#custom-audio-player");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar-fill");
const progressContainer = document.querySelector(".progress-bar");
audio.removeAttribute("controls");

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
function updateProgressBar() {
  if (!Number.isFinite(audio.duration)) return;

  const value = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = value + "%";
}
// Add other functionalities here

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

//rainysound
const rainyAudio = document.querySelector("#rainy-audio");
//rainysound.addEventListener("click", toggleRainy);
function toggleRainy() {
  if (rainyAudio.paused) {
    rainyAudio.play(); 
  } else {
    rainyAudio.pause();
  }
}

//thunderstromsound
const thunderstormAudio = document.querySelector("#thunderstorm-audio");
//thunderstormsound.addEventListener("click", toggleThunderstorm);
function toggleThunderstorm() {
  if (thunderstormAudio.paused) {
    thunderstormAudio.play(); 
  } else {
    thunderstormAudio.pause();
  }
}

//oceanwavesound
const oceanAudio = document.querySelector("#ocean-audio");
//oceansound.addEventListener("click", toggleOcean);
function toggleOcean() {
  if (oceanAudio.paused) {
    oceanAudio.play(); 
  } else {
    oceanAudio.pause();
  }
}

//forestsound
const forestAudio = document.querySelector("#forest-audio");
//oceansound.addEventListener("click", toggleForest);
function toggleForest() {
  if (forestAudio.paused) {
    forestAudio.play(); 
  } else {
    forestAudio.pause();
  }
}

//leafsound
const leafAudio = document.querySelector("#leaf-audio");
//oceansound.addEventListener("click", toggleLeaf);
function toggleLeaf() {
  if (leafAudio.paused) {
    leafAudio.play(); 
  } else {
    leafAudio.pause();
  }
}

//firesound
const fireAudio = document.querySelector("#fire-audio");
//oceansound.addEventListener("click", toggleFire);
function toggleFire() {
  if (fireAudio.paused) {
    fireAudio.play(); 
  } else {
    fireAudio.pause();
  }
}

//pianosound
const pianoAudio = document.querySelector("#piano-audio");
//oceansound.addEventListener("click", toggleForest);
function togglePiano() {
  if (pianoAudio.paused) {
    pianoAudio.play(); 
  } else {
    pianoAudio.pause();
  }
}

//nightsound
const nightAudio = document.querySelector("#night-audio");
//oceansound.addEventListener("click", toggleNight);
function toggleNight() {
  if (nightAudio.paused) {
    nightAudio.play(); 
  } else {
    nightAudio.pause();
  }
}

//seekslider
let isSeeking = false;

function getSeekPercent(e) {
  const rect = progressContainer.getBoundingClientRect();
  const position = e.clientX - rect.left;
  return Math.max(0, Math.min(1, position / rect.width));
}

function seekToPointer(e) {
  if (!Number.isFinite(audio.duration)) return;

  const percent = getSeekPercent(e);
  audio.currentTime = percent * audio.duration;
  progressBar.style.width = percent * 100 + "%";
  currentTimeText.textContent = formatTime(audio.currentTime);
}

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

//timestamp
const currentTimeText = document.querySelector("#curtimetext");
const durationText = document.querySelector("#durtimetext");

// format thời gian (mm:ss)
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return (
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0")
  );
}

audio.addEventListener("loadedmetadata", () => {
  durationText.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  currentTimeText.textContent = formatTime(audio.currentTime);
});

//Focus mode
let isFocusMode = false;

function toggleFocusMode() {
  const overlay = document.querySelector("#focus-overlay");
  const focusBtn = document.querySelector("#focus-btn");
  const focusBtnText = document.querySelector(".focus-btn-text");

  isFocusMode = !isFocusMode;

  overlay.classList.toggle("hidden", !isFocusMode);
  document.body.classList.toggle("is-focus-mode", isFocusMode);
  focusBtn.setAttribute("aria-pressed", String(isFocusMode));
  focusBtnText.textContent = isFocusMode ? "Exit focus" : "Focus";
}

//back to start
function toggleStart() {
  audio.currentTime = 0;
}

//next part 2
function toggleNext () {
  audio.currentTime = audio.duration;
   window.location.href = "study.html";
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