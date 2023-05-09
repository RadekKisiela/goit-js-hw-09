import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datePicker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      window.alert('Please choose a date in the future');
      return;
    }
    const startBtn = document.getElementById('start-btn');
    startBtn.disabled = false;
  },
});

const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', startTimer);

function startTimer() {
  startBtn.disabled = true;
  const timer = document.querySelector('.timer');
  const daysElem = timer.querySelector('[data-days]');
  const hoursElem = timer.querySelector('[data-hours]');
  const minutesElem = timer.querySelector('[data-minutes]');
  const secondsElem = timer.querySelector('[data-seconds]');
  const endDate = datePicker.selectedDates[0];

  function updateTimer() {
    const remainingTime = endDate.getTime() - Date.now();
    if (remainingTime < 0) {
      clearInterval(intervalId);
      startBtn.disabled = false;
      daysElem.textContent = '00';
      hoursElem.textContent = '00';
      minutesElem.textContent = '00';
      secondsElem.textContent = '00';
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    daysElem.textContent = days < 10 ? '0' + days : days;
    hoursElem.textContent = hours < 10 ? '0' + hours : hours;
    minutesElem.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsElem.textContent = seconds < 10 ? '0' + seconds : seconds;
  }

  updateTimer();
  const intervalId = setInterval(updateTimer, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000));
console.log(convertMs(140000));
console.log(convertMs(24140000));
