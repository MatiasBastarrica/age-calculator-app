const dayInput = document.querySelector("input[name='day']");
const monthInput = document.querySelector("input[name='month']");
const yearInput = document.querySelector("input[name='year']");
const inputs = document.querySelectorAll("input[type='number']");
const form = document.querySelector("form");

const yearsDisplay = document.querySelector(".years-display");
const monthsDisplay = document.querySelector(".months-display");
const daysDisplay = document.querySelector(".days-display");

const currentDate = new Date();

function calcYears(currentDate, dateSubmitted) {
  if (
    dateSubmitted.month - 1 === currentDate.getMonth() &&
    currentDate.getDate() >= dateSubmitted.day
  ) {
    // yearsDisplay.textContent = currentDate.getFullYear() - dateSubmitted.year;
    return currentDate.getFullYear() - dateSubmitted.year;
  } else {
    // yearsDisplay.textContent =
    // currentDate.getFullYear() - dateSubmitted.year - 1;
    return currentDate.getFullYear() - dateSubmitted.year - 1;
  }
}

function calcMonths(currentDate, dateSubmitted, yearsToBeDisplayed) {
  // monthsDisplay.textContent =
  //   12 - dateSubmitted.month + currentDate.getMonth() + 1;
  let monthsTotal = 12 - dateSubmitted.month + currentDate.getMonth() + 1;
  if (monthsTotal > 12) {
    yearsToBeDisplayed += 1;
    return monthsTotal - 12;
  } else {
    return monthsTotal - 1;
  }
}

function calcDays(currentDate, dateSubmitted) {
  // daysDisplay.textContent = currentDate.getDate();
  const daysLeftOfTheMonth =
    getMaxDay(months[dateSubmitted.month - 1]) - dateSubmitted.day;
  return daysLeftOfTheMonth + currentDate.getDate();
}

function getMaxDay(month) {
  for (const day in validDays) {
    if (validDays[day].includes(month)) {
      return day;
    }
  }
}

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

const isLeapYear = function (year) {
  let isYearDivisibleByFour = year % 4 === 0;
  let isCentury = year % 100 === 0;
  let isYearDivisibleByFourHundred = year % 400 === 0;

  if ((isYearDivisibleByFour && !isCentury) || isYearDivisibleByFourHundred) {
    return true;
  } else {
    return false;
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const dateSubmitted = {
    day: dayInput.value,
    month: monthInput.value,
    year: yearInput.value,
  };
  const daysErrorMsg = document.querySelector(".day-error");

  if (
    months[dateSubmitted.month - 1] === "february" &&
    isLeapYear(dateSubmitted.year) &&
    dateSubmitted.day > 29
  ) {
    daysErrorMsg.classList.remove("hide");
    daysErrorMsg.textContent = "Must be a valid date";
  } else if (
    !isLeapYear(dateSubmitted.year) &&
    dateSubmitted.day > getMaxDay(months[dateSubmitted.month - 1])
  ) {
    daysErrorMsg.classList.remove("hide");
    daysErrorMsg.textContent = "Must be a valid date";
  } else {
    let yearsToBeDisplayed;
    let monthToBeDisplayed;
    let daysToBeDisplayed;
    // calcYears(currentDate, dateSubmitted);
    // calcMonths(currentDate, dateSubmitted);
    // calcDays(currentDate, dateSubmitted);

    yearsToBeDisplayed = calcYears(currentDate, dateSubmitted);
    monthToBeDisplayed = calcMonths(
      currentDate,
      dateSubmitted,
      yearsToBeDisplayed
    );
    daysToBeDisplayed = calcDays(currentDate, dateSubmitted);

    daysDisplay.textContent = daysToBeDisplayed;
    monthsDisplay.textContent = monthToBeDisplayed;
    yearsDisplay.textContent = yearsToBeDisplayed;
  }
});

inputs.forEach((input) => {
  input.addEventListener("invalid", (e) => {
    const errorMessages = document.querySelectorAll(".error-message");
    e.preventDefault();
    if (input.validity.valueMissing) {
      errorMessages.forEach((errorMessage) => {
        errorMessage.classList.remove("hide");
        errorMessage.textContent = "This field is required";
      });
    }
  });
});

dayInput.addEventListener("input", () => {
  const daysErrorMsg = document.querySelector(".day-error");
  if (dayInput.validity.rangeUnderflow || dayInput.validity.rangeOverflow) {
    daysErrorMsg.classList.remove("hide");
    daysErrorMsg.textContent = "Must be a valid day";
  } else if (dayInput.validity.valid) {
    daysErrorMsg.classList.add("hide");
  }
});

monthInput.addEventListener("input", () => {
  const monthErrorMsg = document.querySelector(".month-error");
  if (monthInput.validity.rangeUnderflow || monthInput.validity.rangeOverflow) {
    monthErrorMsg.classList.remove("hide");
    monthErrorMsg.textContent = "Must be a valid month";
  } else if (monthInput.validity.valid) {
    monthErrorMsg.classList.add("hide");
  }
});

yearInput.addEventListener("input", () => {
  const yearErrorMsg = document.querySelector(".year-error");
  const currentYear = currentDate.getFullYear();
  if (yearInput.value > currentYear) {
    yearErrorMsg.classList.remove("hide");
    yearErrorMsg.textContent = "Must be in the past";
  } else {
    yearErrorMsg.classList.add("hide");
  }
});
