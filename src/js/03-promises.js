'use strict'

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector(".form");

formEl.addEventListener("submit", setData);

let formData = {};

function setData(event) {
  event.preventDefault();
 
  const delay = Number(event.target.elements.delay.value);
  const step = Number(event.target.elements.step.value);
  const position = Number(event.target.elements.amount.value);
 
  formData = {
    delay,
    step,
    position,
  };
  
  let someTime = delay-step;
  
  for (let i = 1; i <= position; i += 1) {
    someTime += step;   

    createPromise({ i, someTime })
      .then(({ i, someTime }) => {
        Notify.success(`✅ Fulfilled promise ${i} in ${someTime}ms`);
      })
      .catch(({ i, someTime }) => {
        Notify.failure(`❌ Rejected promise ${i} in ${someTime}ms`);
      });
  } formEl.reset();
}


function createPromise({i , someTime} ) {
 
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;

      setInterval(() => {
        if (shouldResolve) {
          resolve({ i , someTime});
        } else {
          reject({ i , someTime});
        };
      }, someTime);

    }); 
}  

