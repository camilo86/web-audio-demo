// Create context for audio manipulation
const audioContext = new AudioContext();

// Load sound from <audio> tag
const audioElement = document.querySelector("audio");
const track = audioContext.createMediaElementSource(audioElement);

const gainNode = audioContext.createGain();

track.connect(gainNode).connect(audioContext.destination);

// Handle Play/Pause button
const playPauseButtonElement = document.getElementById("play-pause-btn");

playPauseButtonElement.addEventListener(
  "click",
  function () {
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    if (this.dataset.playing === "false") {
      audioElement.play();
      this.dataset.playing = "true";
    } else {
      audioElement.pause();
      this.dataset.playing = "false";
    }
  },
  false
);

// Handle volume slider
const volumeSliderElement = document.getElementById("volume-slider");

volumeSliderElement.addEventListener("input", function () {
  gainNode.gain.value = this.value;
}),
  false;

// Handle end of sound file
audioElement.addEventListener(
  "ended",
  function () {
    playPauseButtonElement.dataset.playing = "false";
  },
  false
);
