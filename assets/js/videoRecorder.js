const recorderContainer = document.getElementById("jsRecordContainer");
const recordButton = document.getElementById("jsRecordButton");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = event => {
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

const stopRecording = () => {
  videoRecorder.stop();
  recordButton.removeEventListener("click", stopRecording);
  recordButton.addEventListener("click", getVideo);
  recordButton.innerHTML = "Start Recording";
};

const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  recordButton.addEventListener("click", stopRecording);
  videoRecorder.addEventListener("dataavailable", handleVideoData);
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1200, height: 720 }
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordButton.innerHTML = "Stop Recording";
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordButton.innerHTML = "Sorry, Can't record!";
    recordButton.removeEventListener("click", startRecording);
  } finally {
    recordButton.removeEventListener("click", getVideo);
  }
};

function init() {
  recordButton.addEventListener("click", getVideo);
}

if (recorderContainer) {
  init();
}
