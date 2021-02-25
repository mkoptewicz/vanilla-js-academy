const monsters = [
  "monster1",
  "monster2",
  "monster3",
  "monster4",
  "monster5",
  "monster6",
  "monster7",
  "monster8",
  "monster9",
  "monster10",
  "monster11",
  "sock",
];
const btnColors = ["#7e0f7e", "#34ac52", "#f42b37", "#1589ca", "#daa829"];
const monstersContainer = document.querySelector(".row");
const btnShuffle = document.querySelector(".shuffle");
const textMessage = document.querySelector(".end-game-message-text");
const endMessage = document.querySelector(".end-game-message");
const btnReset = document.querySelector(".restart");

let counter = monsters.length;

function shuffle(arr) {
  let currentIndex = arr.length;
  let index;
  while (currentIndex > 0) {
    index = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[index]] = [arr[index], arr[currentIndex]];
  }
  return arr;
}
function revealMonster(e) {
  if (!e.target.matches("[data-monster]")) return;
  e.target.matches(".grid")
    ? (e.target.querySelector(
        "img"
      ).src = `imgs/${e.target.dataset.monster}.svg`)
    : (e.target.src = `imgs/${e.target.closest("button").dataset.monster}.svg`);
  counter--;
  console.log(counter);
  if (counter === 1 || e.target.dataset.monster === "sock") {
    textMessage.textContent = counter === 1 ? "You won!" : "You lost!";
    endMessage.classList.add("show");
    btnReset.focus();
  }
}

const animateGrid = () =>
  document
    .querySelectorAll(".grid")
    .forEach(
      i => (i.style.animation = `fadein .2s ${Math.random() + 0.2}s forwards`)
    );
const setRandomBtnColor = () => {
  const randomColor = btnColors[Math.floor(Math.random() * btnColors.length)];
  document.documentElement.style.setProperty("--btnColor", randomColor);
};
const startGame = () => {
  counter = monsters.length;
  endMessage.classList.remove("show");
  const monstersShuffled = shuffle(monsters.slice());
  monstersContainer.innerHTML = monstersShuffled
    .map(
      m =>
        `<button class="grid" data-monster="${m}"><img alt="${m}" data-monster="${m}" src='imgs/door.svg'></button>`
    )
    .join("");

  animateGrid();
  setRandomBtnColor();
};
startGame();
btnReset.addEventListener("click", startGame);
document.querySelector(".row").addEventListener("click", revealMonster);
