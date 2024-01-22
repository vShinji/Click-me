const button = document.querySelector(".btn");
const audio = document.getElementById("my-audio");
const toothless = document.querySelector(".toothless");


function play() {
  audio.play();
  audio.addEventListener("playing", function() {
    console.log("audio playing");
  });
  audio.addEventListener("ended", function() {
    console.log("audio ended");
  });
};

button.addEventListener("click", function(e) {
  e.preventDefault();
  e.target.classList.add("d-none");
  toothless.classList.remove("d-none");
  document.title = "Toothless Dance!";
  setTimeout(() => {
    document.body.classList.add("background-active");
  }, 16500);
});
