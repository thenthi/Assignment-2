const audio = document.querySelector("#custom-audio-player");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar-fill");
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