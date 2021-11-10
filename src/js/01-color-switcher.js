'use strict'

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');

const colorCnange = {
  changeId: null,
  isActive: false,

  changeBackgroundColor() {
    if (this.isActive) {
      return
    }
    this.isActive = true;
    this.changeId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)

  },

stopChangeBackgroundColor() {
  clearInterval(this.changeId);
  this.isActive = false;
},
}

btnStartEl.addEventListener('click', colorCnange.changeBackgroundColor.bind(colorCnange));

btnStopEl.addEventListener('click', colorCnange.stopChangeBackgroundColor.bind(colorCnange));


