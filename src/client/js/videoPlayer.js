const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");

const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");

const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");

const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenBtnIcon = fullScreenBtn.querySelector("i");

const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
//controls

let volumeValue = 0.5;
video.volume = volumeValue;
//volume

let videoPlayStatus = false;
let setVideoPlayStatus = false;
//videoplayer

const handlePlayClick = (e) => {
  //if the video is playing, pause it
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
  //else play the video
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
  }
  if (volumeRange.value == 0 || video.muted == true) {
    muteBtnIcon.classList = "fas fa-volume-mute";
  } else if (volumeRange.value != 0 || video.muted == false) {
    muteBtnIcon.classList = "fas fa-volume-up";
  }
  volumeValue = value;
  video.volume = value;
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(14, 19);

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.ceil(video.duration));
  timeline.max = Math.ceil(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.ceil(video.currentTime));
  timeline.value = Math.ceil(video.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  if (!setVideoPlayStatus) {
    videoPlayStatus = video.paused ? false : true;
    setVideoPlayStatus = true;
  }
  video.pause();
  video.currentTime = value;
};

const handleTimelineSet = () => {
  videoPlayStatus ? video.play() : video.pause();
  setVideoPlayStatus = false;
};

const handleFullScreen = () => {
  const fullescreen = document.fullscreenElement;
  if (fullescreen) {
    document.exitFullscreen();
    fullScreenBtnIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtnIcon.classList = "fas fa-compress";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 1000);
  //오래된 timeout은 취소, 새로운 timeout을 생성
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 1000);
};

const handleVideoPlayClick = () => {
  handlePlayClick();
};

const changeVideotime = (seconds) => {
  video.currentTime += seconds;
};

const keyBtnControls = (event) => {
  if (event.code === "Space") {
    handlePlayClick();
  }
  if (event.code === "ArrowRight") {
    changeVideotime(5);
  }
  if (event.code === "ArrowLeft") {
    changeVideotime(-5);
  }
};

document.addEventListener("keyup", keyBtnControls);

playBtn.addEventListener("click", handlePlayClick); //play 버튼
muteBtn.addEventListener("click", handleMute); //음소거 버튼
volumeRange.addEventListener("input", handleVolumeChange); //볼륨 버튼

video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("click", handleVideoPlayClick);

videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);

timeline.addEventListener("input", handleTimelineChange);
timeline.addEventListener("change", handleTimelineSet);

fullScreenBtn.addEventListener("click", handleFullScreen);
