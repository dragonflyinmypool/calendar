let startDate = [2024,12,6];
let weeksInterval = 7;
let daysInterval = 7 * weeksInterval;

// Generate next days functions
function isLeapYear(year) {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
}
function getDaysInMonth(year, month) {
    const daysInMonth = [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonth[month - 1];
}
function generateNextDate(lastDate, interval) { 
    let [year, month, day] = lastDate;
    day += interval; // Add interval in days

    while (day > getDaysInMonth(year, month)) {
        day -= getDaysInMonth(year, month);
        month += 1;
        if (month > 12) {
            year += 1;
            month = 1;
        }
    }

    return [year, month, day];
}



// function to call generateNextDate continuesly until 365 days from start date
let lastDay = generateNextDate(startDate, 365)
let listOfServiceDates = [];
let date = startDate;

while (date < lastDay) {
    date = generateNextDate(startDate, daysInterval)
    listOfServiceDates.push(nextDate)
}

console.log(listOfServiceDates)

console.log(generateNextDate(startDate, daysInterval));