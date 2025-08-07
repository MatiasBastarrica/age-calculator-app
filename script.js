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

const yearsDisplay = document.querySelector(".years-display");
const monthsDisplay = document.querySelector(".months-display");
const daysDisplay = document.querySelector(".days-display");

let dateSubmitted;
let currentDate;

// dateSubmitted:
// d1 = 26
// m1 = 10
// y1 = 2001

// currentDate:
// d2 = 6
// m2 = 8
// y2 = 2025

// years calculation:
// if (m1 = m2 && d1 >=d2) {
//  years = y2 - y1;
// }else {
//    years = (y2 - y1) - 1
//}
//

// months calculation:
//   months = (11 - m1) + m2 +1

// days calculation:
// days = d2

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
