const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playButton = document.getElementById("jsPlayButton");
const volumeButton = document.getElementById("jsVolumeButton");
const fullScreenButton = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playButton.innerHTML = `<i class="fas fa-pause"></i>`;
  } else {
    videoPlayer.pause();
    playButton.innerHTML = `<i class="fas fa-play"></i>`;
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeButton.innerHTML = `<i class="fas fa-volume-up"></i>`;
    volumeRange.value = videoPlayer.volume;
  } else {
    volumeRange.value = 0;
    videoPlayer.muted = true;
    volumeButton.innerHTML = `<i class="fas fa-volume-mute"></i>`;
  }
}

const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }

  return `${hours}:${minutes}:${totalSeconds}`;
};

function exitFullScreen() {
  fullScreenButton.innerHTML = `<i class="fas fa-expand"></i>`;
  fullScreenButton.addEventListener("click", goFullScreen);
  document.exitFullscreen();
}

function goFullScreen() {
  videoContainer.requestFullscreen();
  fullScreenButton.innerHTML = `<i class="fas fa-compress"></i>`;
  fullScreenButton.removeEventListener("click", goFullScreen);
  fullScreenButton.addEventListener("click", exitFullScreen);
}

function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
}

function handleEnded() {
  videoPlayer.currentTime = 0;
  playButton.innerHTML = `<i class="fas fa-play"></i>`;
}

function handleDrag(event) {
  const {
    target: { value }
  } = event;
  videoPlayer.volume = value;

  if (value >= 0.6) {
    volumeButton.innerHTML = `<i class="fas fa-volume-up"></i>`;
  } else if (value >= 0.3) {
    volumeButton.innerHTML = `<i class="fas fa-volume-down"></i>`;
  } else {
    volumeButton.innerHTML = `<i class="fas fa-volume-off"></i>`;
  }
}

function init() {
  videoPlayer.volume = 0.5;
  playButton.addEventListener("click", handlePlayClick);
  volumeButton.addEventListener("click", handleVolumeClick);
  fullScreenButton.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleDrag);
}

if (videoContainer) {
  init();
}
