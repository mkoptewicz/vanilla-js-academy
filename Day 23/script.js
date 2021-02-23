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
const monstersContainer = document.querySelector("#app");
const btnShuffle = document.querySelector(".shuffle");
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
const setRandomBtnColor = ()=>{
 const randomColor = btnColors[Math.floor(Math.random() * btnColors.length)];
 console.log(randomColor);
 document.documentElement.style.setProperty('--btnColor', randomColor)
}
const renderMonsters = () => {
  const monstersShuffled = shuffle(monsters);
  monstersContainer.innerHTML = monstersShuffled
    .slice()
    .map(m => `<img src='imgs/${m}.svg'/>`)
    .join("");
  setRandomBtnColor()
};
renderMonsters();
btnShuffle.addEventListener("click", renderMonsters);