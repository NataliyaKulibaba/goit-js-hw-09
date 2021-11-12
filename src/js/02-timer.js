'use strict'

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.getElementById('datetime-picker');
const btnStartEl = document.querySelector('[data-start]');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');


btnStartEl.disabled = true;

let selectedDate;

const options = {
    enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {

    const date = Date.now();
  
    if (selectedDates[0].getTime() < date) {
      return Notify.failure("Please choose a date in the future");
    }

    btnStartEl.disabled = false;
    btnStartEl.classList.add('valid');
    selectedDate = selectedDates[0].getTime()
    console.log(selectedDates[0].getTime())
    return selectedDate ;
  },
};


flatpickr(inputEl, options);

const timer = {
  intervalId:null,
  isActive: false,
  
  
  start() {
    if (this.isActive) {
      return;
    }
    
    const startTime = selectedDate;

    this.isActive = true;
    btnStartEl.classList.remove('valid');
    console.log(startTime);
  
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = convertMs(deltaTime);

      updateClockFace(time);
    }, 1000);
  }
}


btnStartEl.addEventListener('click', () => {
  timer.start();
});
  

function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
 

function updateClockFace({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
  if (`${days}` === "00" && `${hours}` === "00" && `${minutes}` === "00" && `${seconds}` === "00") {
      clearInterval(timer.intervalId)
    }
  }

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
