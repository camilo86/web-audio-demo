// Create context for audio manipulation
const audioContext = new AudioContext();

// Load sound from <audio> tag
const audioElement = document.querySelector("audio");
const track = audioContext.createMediaElementSource(audioElement);

const gainNode = audioContext.createGain();
const pannerNode = audioContext.createStereoPanner();

track.connect(gainNode).connect(pannerNode).connect(audioContext.destination);

// Handle Play/Pause button
const playPauseButtonElement = document.getElementById("play-pause-btn");

playPauseButtonElement.addEventListener(
  "click",
  function () {
    if (audioContext.state === "suspended") {
      audioContext.resume();
      playPauseButtonElement.innerText = "Pause";
    }

    if (this.dataset.playing === "false") {
      audioElement.play();
      this.dataset.playing = "true";
      playPauseButtonElement.innerText = "Pause";
    } else {
      audioElement.pause();
      this.dataset.playing = "false";
      playPauseButtonElement.innerText = "Play";
    }
  },
  false
);

// Handle volume slider
const volumeSliderElement = document.getElementById("volume-slider");
const volumeValueSpanElement = document.getElementById("volume-value");

volumeSliderElement.addEventListener(
  "input",
  function () {
    gainNode.gain.value = this.value;
    volumeValueSpanElement.innerText = "(" + this.value + ")";
  },
  false
);

// Handle panner slider
const pannerSliderElement = document.getElementById("panner-slider");
const pannerValueSpanElement = document.getElementById("panner-value");

pannerSliderElement.addEventListener(
  "input",
  function () {
    pannerNode.pan.value = this.value;
    pannerValueSpanElement.innerText = "(" + this.value + ")";
  },
  false
);

// Handle end of sound file
audioElement.addEventListener(
  "ended",
  function () {
    playPauseButtonElement.dataset.playing = "false";
  },
  false
);
