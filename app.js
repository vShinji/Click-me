const button = document.querySelector(".btn");
const audio = document.getElementById("my-audio");
const toothless = document.getElementById("toothless");


function play() {
  audio.play();
};

button.addEventListener("click", function(e) {
  e.preventDefault();
  e.target.classList.add("d-none");
  toothless.classList.remove("d-none");
  document.title = "Toothless Dance!";
});
