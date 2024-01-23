const button = document.querySelector(".btn");
const audio = document.getElementById("my-audio");
const toothless = document.querySelector(".toothless");
const canvas = document.querySelector(".canvas1");
const ctx = canvas.getContext("2d");

let audioSource;
let analyser;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


button.addEventListener("click", function(e) {
  e.preventDefault();
  e.target.classList.add("d-none");
  toothless.classList.remove("d-none");
  document.title = "Toothless Dance!";
  setTimeout(() => {
    document.body.classList.add("background-active");
  }, 16500);

  const audioCtx = new AudioContext();
  const audio1 = document.querySelector(".audio1");
  audio1.src = "";

  audio.play();
  audioSource = audioContext.createMediaElementsSource(audio1);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 64;

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  const barWidth = canvas.width/bufferLength;
  let barHeight;
  let x;

  canvas.classList.remove("d-none");

  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      ctx.fillStyle = "white";
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth;
    }
    requestAnimationFrame(animate);
  }
  animate();
});
