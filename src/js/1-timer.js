// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      
    if (selectedDate < new Date()) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
            });
            document.querySelector('[data-start]').disabled = true;
        } else {
            userSelectedDate = selectedDate;
            document.querySelector('[data-start]').disabled = false;
        };
    },
    
};
const inputEl = document.querySelector('input#datetime-picker');
flatpickr(inputEl, options);

let userSelectedDate = null;
let timerInterval = null;

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

function addZero(value) {
    return String(value).padStart(2, '0');
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
    document.querySelector('[data-days]').textContent = addZero(days);
    document.querySelector('[data-hours]').textContent = addZero(hours);
    document.querySelector('[data-minutes]').textContent = addZero(minutes);
    document.querySelector('[data-seconds]').textContent = addZero(seconds);
}

document.querySelector('[data-start]').addEventListener('click', function () {
    if (!userSelectedDate) return;

    document.querySelector('[data-start]').disabled = true;
    document.querySelector('#datetime-picker').disabled = true;

    timerInterval = setInterval(() => {
        const now = new Date();
        const timeLeft = userSelectedDate - now;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            document.querySelector('[data-start]').disabled = true;
            document.querySelector('#datetime-picker').disabled = false;
            return;
        }

        const timeComponents = convertMs(timeLeft);
        updateTimerDisplay(timeComponents);
    }, 1000);
});




