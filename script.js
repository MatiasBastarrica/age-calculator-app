/*  REQUIREMENTS

  - View an age in years, months, and days after submitting a valid date through the form
  - Receive validation errors if:
  - Any field is empty when the form is submitted
  Show: "This field is required"
  - The day number is not between 1-31
  Show: "Must be a valid day"
  - The month number is not between 1-12
  Show: "Must be a valid month"
  - The date is in the future
  Show: "Must be in the past"
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
  Show: "Must be a valid date" (Just one error message at the beginning)


*/

const dayInput = document.querySelector("input[name='day']");
const monthInput = document.querySelector("input[name='month']");
const yearInput = document.querySelector("input[name='year']");
const form = document.querySelector("form");

const yearsDisplay = document.querySelector(".years-display");
const monthsDisplay = document.querySelector(".months-display");
const daysDisplay = document.querySelector(".days-display");

const currentDate = new Date();

function calcYears(currentDate, dateSubmitted) {
  if (
    dateSubmitted.month - 1 === currentDate.getMonth() &&
    dateSubmitted.day >= currentDate.getDate()
  ) {
    yearsDisplay.textContent = currentDate.getFullYear() - dateSubmitted.year;
  } else {
    yearsDisplay.textContent =
      currentDate.getFullYear() - dateSubmitted.year - 1;
  }
}

function calcMonths(currentDate, dateSubmitted) {
  monthsDisplay.textContent =
    12 - dateSubmitted.month + currentDate.getMonth() + 1;
}

function calcDays(currentDate, dateSubmitted) {
  daysDisplay.textContent = currentDate.getDate();
}

function getMaxDay(month) {
  for (const day in validDays) {
    if (validDays[day].includes(month)) {
      return day;
    }
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const dateSubmitted = {
    day: dayInput.value,
    month: monthInput.value,
    year: yearInput.value,
  };
  calcYears(currentDate, dateSubmitted);
  calcMonths(currentDate, dateSubmitted);
  calcDays(currentDate, dateSubmitted);
});

const validDays = {
  28: "february",
  30: ["april", "june", "september", "november"],
  31: ["january", "march", "may", "july", "august", "october", "december"],
};

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
