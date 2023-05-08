function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
let intervalId;
const startButton=document.querySelector("[data-start]");
const stopButton=document.querySelector("[data-stop]");

function startColorChange(){
    startButton.disabled = true;
    stopButton.disabled = false;
    intervalId = setInterval(changeBackgroundColor, 1000);
}
function stopColorChange(){
startButton.disabled = false;
stopButton.disabled = true;
clearInterval(intervalId);
}

function changeBackgroundColor(){
    document.body.style.backgroundColor = getRandomHexColor();
}
startButton.addEventListener("click", startColorChange);
stopButton.addEventListener("click", stopColorChange);