const button = document.querySelector(".btn");
const audio = document.getElementById("my-audio");
const toothless = document.querySelector(".toothless");
const canvas = document.querySelector(".canvas1");
const ctx = canvas.getContext("2d");
const wait = document.querySelector(".wait");

let audioSource;
let analyser;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


button.addEventListener("click", function(e) {
  e.preventDefault();
  e.target.classList.add("d-none");
  toothless.classList.remove("d-none");
  canvas.classList.remove("d-none");
  wait.classList.remove("d-none");
  document.title = "Toothless Dance!";
  setTimeout(() => {
    document.body.classList.add("background-active");
    wait.classList.add("d-none");
  }, 16500);

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
  const barWidth = 15;
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
    barHeight = dataArray[i] * 1.5;
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(i * Math.PI * 20 / bufferLength);
    const hue = i * 0.3;
    ctx.fillStyle = "hsl(" + hue + ",100%," + barHeight/3 + "%)";
    ctx.fillRect(0, 0, barWidth, barHeight);
    x += barWidth;
    ctx.restore();
  }
}
