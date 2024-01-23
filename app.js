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
  canvas.classList.remove("d-none");
  document.title = "Toothless Dance!";
  // setTimeout(() => {
  //   document.body.classList.add("background-active");
  // }, 16500);

  const audioContext = new AudioContext();

  audio.volume = 0.5;
  audio.play();
  audioSource = audioContext.createMediaElementSource(audio);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 2048;

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  const barWidth = (canvas.width/2)/bufferLength;
  let barHeight;
  let x;

  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
    requestAnimationFrame(animate);
  }
  animate();
});

function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray) {
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] * 2;
    const red = i * barHeight/20;
    const green = i/2;
    const blue = barHeight/2;
    ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
    ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth;
  }
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] * 2;
    const red = i * barHeight/20;
    const green = i/2;
    const blue = barHeight/2;
    ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth;
  }
}
