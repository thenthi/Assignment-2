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
//click to exact time-stamp
progressContainer.addEventListener("click", (e) => {
  const rect = progressContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;
  const percent = clickX / width;
  audio.currentTime = percent * audio.duration;
});

//drag to exact time-stamp
let isDragging = false;
progressContainer.addEventListener("mousedown", () => {
  isDragging = true;
});
document.addEventListener("mouseup", () => {
  isDragging = false;
});
document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const rect = progressContainer.getBoundingClientRect();
  const moveX = e.clientX - rect.left;
  const width = rect.width;
  let percent = moveX / width;
  percent = Math.max(0, Math.min(1, percent));
  audio.currentTime = percent * audio.duration;
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

  isFocusMode = !isFocusMode;

  if (isFocusMode) {
    overlay.classList.remove("hidden");
  } else {
    overlay.classList.add("hidden");
  }
}