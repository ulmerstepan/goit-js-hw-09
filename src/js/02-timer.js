import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('button[data-start]');
const daysField = document.querySelector("[data-days]");
const hoursField = document.querySelector("[data-hours]");
const minutesField = document.querySelector("[data-minutes]");
const secondsField = document.querySelector("[data-seconds]");


btnStart.disabled = true;
let selectedDate = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    
        if (selectedDates[0] < options.defaultDate) {
            Notify.warning("Please choose a date in the future");
        };

        if (selectedDates[0] > options.defaultDate) {
            btnStart.disabled = false;
            selectedDate = selectedDates[0];
        };
    },
};

flatpickr("#datetime-picker", options);

btnStart.addEventListener('click', onBtnClick);

function onBtnClick() {
    
    setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = selectedDate - currentTime;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        console.log(`${days}:${hours}:${minutes}:${seconds}`);
        daysField.textContent = `${days}`.padStart(2, "0");
        hoursField.textContent = `${hours}`.padStart(2, "0");
        minutesField.textContent = `${minutes}`.padStart(2, "0");
        secondsField.textContent = `${seconds}`.padStart(2,"0");
    }, 1000)
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}