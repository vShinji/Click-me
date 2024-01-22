const button = document.querySelector(".btn");
const audio = document.getElementById("my-audio");

function play() {
  audio.play();
};

button.addEventListener("click", function(e) {
  e.preventDefault();
  e.target.classList.add("d-none");
});
