const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let colorChangeInterval = null;

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
    colorChangeInterval = setInterval(changeBackground, 1000);
    btnStart.disabled = true;
};

function onBtnStopClick() {
    clearInterval(colorChangeInterval);
    btnStart.disabled = false;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBackground() {
   document.body.style.background = getRandomHexColor();
}

