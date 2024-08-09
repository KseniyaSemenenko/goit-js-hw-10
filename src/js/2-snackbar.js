// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const btnSub = document.querySelector('.form');
btnSub.addEventListener('submit', submitForm);

function submitForm (event) {
  event.preventDefault();

  const state = event.target.querySelector('input[name="state"]:checked').value;
  const delay = Number(event.target.querySelector('input[name="delay"]').value);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then((resolvedDelay) => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${resolvedDelay}ms`,
        position: 'topRight',
      });
    })
    .catch((rejectedDelay) => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${rejectedDelay}ms`,
        position: 'topRight',
      });
    });
}