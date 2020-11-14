const recordButtonElement = document.getElementById("record-btn");
const audioContainerSpanElement = document.getElementById("audio-container");

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
    })
    .then(function (stream) {
      const mediaRecorder = new MediaRecorder(stream);
      let chunks = [];

      recordButtonElement.addEventListener(
        "click",
        function () {
          if (!this.dataset.recording || this.dataset.recording === "false") {
            audioContainerSpanElement.innerText = "";

            mediaRecorder.start();
            this.dataset.recording = "true";
            recordButtonElement.innerText = "Stop Recording";
          } else {
            mediaRecorder.stop();
            this.dataset.recording = "false";
            recordButtonElement.innerText = "Start Recording";
          }
        },
        false
      );

      mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = function (e) {
        const audioElement = document.createElement("audio");
        audioElement.setAttribute("controls", "");
        audioElement.setAttribute("style", "width: 100%; margin-top: 8px;");

        audioContainerSpanElement.appendChild(audioElement);

        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        chunks = [];

        audioElement.src = window.URL.createObjectURL(blob);
      };
    })
    .catch(function () {
      console.error("Did not get permission to access audio");
    });
} else {
  console.error("Browser does not support media device");
}
