const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const pauseAndPlay = document.getElementById("jsPlayButton");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");

function handlePlayClick() {
  if (videoPlayer.paused) {
    pauseButton.classList.add("notShow");
    playButton.classList.remove("notShow");
    videoPlayer.play();
  } else {
    pauseButton.classList.remove("notShow");
    playButton.classList.add("notShow");
    videoPlayer.pause();
  }
}

function init() {
  pauseAndPlay.addEventListener("click", handlePlayClick);
}

if (videoContainer) {
  init();
}
