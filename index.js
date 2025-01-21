"use strict";

// Hover event on Main Heading
$("h1").hover(
  () => {
    $("h1").addClass("red-text");
  },
  () => {
    $("h1").removeClass("red-text");
  }
);

// empty array to capture the daily hours
let dailyHoursArray = [];

/* Main function that calculates: 
- total hours 
- average weekly hours 
- how many days worked
- Which day/s the employee worked maximum
- If this was a full-time week or not (35 or more hours) */
const weeklyWork = function (data) {
  if (data.length > 7) throw new Error("The array length should not exceed 7.");

  let totalHours = 0;
  let daysWorked = 0;
  let maxDay = -Infinity;
  const maxDayObject = {};
  let maxDayIndex;
  let isFullTime = false;

  // loop to calculate total hours and number of days worked
  for (let i = 0; i < data.length; i++) {
    totalHours += data[i];
    if (data[i] > maxDay) {
      maxDay = data[i];
      maxDayIndex = i;
    }
    // [failed] Attempt to solve when there are multiple maxDays
    /*
    if (data[i] >= maxDay) {
      if (data[i] === maxDay) {
      } else {
        maxDay = data[i];
        maxDayIndex = i;
      }
    }
    */

    // Number of days worked only if array value is above zero
    if (data[i] > 0) daysWorked += 1;
  }

  // average hours upto two decimal places
  const averageHours = Math.round((totalHours / 7) * 100) / 100;

  // based on the maxDayIndex, maxDay will be assigned a day when he/she worked maximum
  // Note: this only assigns first maximum among equals
  switch (maxDayIndex) {
    case 0:
      maxDay = "Monday";
      break;
    case 1:
      maxDay = "Tuesday";
      break;
    case 2:
      maxDay = "Wednesday";
      break;
    case 3:
      maxDay = "Thursday";
      break;
    case 4:
      maxDay = "Friday";
      break;
    case 5:
      maxDay = "Saturday";
      break;
    case 6:
      maxDay = "Sunday";
      break;
    default:
      maxDay = "None";
      break;
  }

  if (totalHours === 0) maxDay = "None";
  if (totalHours >= 35) isFullTime = true;

  // based on the boolean isFullTime we return everything that was calculated
  if (isFullTime) return [totalHours, averageHours, maxDay, daysWorked, "Yes"];
  else return [totalHours, averageHours, maxDay, daysWorked, "No"];
};

// Hard coded data: data1 and data2
// const data1 = [7.5, 8, 6.5, 0, 8.5, 4, 0];
// const data2 = [0, 0, 0, 1, 0];

// Main Event triggers when user hits Submit
$("#weekly-form").on("submit", function (event) {
  event.preventDefault(); // Prevents the form from submitting normally

  // loop to push all the data user entered in the array: dailyHoursArray
  for (let i = 0; i < 7; i++) {
    let temp = "";
    switch (i) {
      case 0:
        temp = $("#monday").val();
        dailyHoursArray.push(Number(temp));
        break;
      case 1:
        temp = $("#tuesday").val();
        dailyHoursArray.push(Number(temp));
        break;
      case 2:
        temp = $("#wednesday").val();
        dailyHoursArray.push(Number(temp));
        break;
      case 3:
        temp = $("#thursday").val();
        dailyHoursArray.push(Number(temp));
        break;
      case 4:
        temp = $("#friday").val();
        dailyHoursArray.push(Number(temp));
        break;
      case 5:
        temp = $("#saturday").val();
        dailyHoursArray.push(Number(temp));
        break;
      case 6:
        temp = $("#sunday").val();
        dailyHoursArray.push(Number(temp));
        break;
      default:
        console.log("Wrong case.");
        break;
    }
  }
  console.log(dailyHoursArray);

  // calling the function: weeklyWork() and storing the multiple returns
  const [totalHours, averageHours, maxDay, daysWorked, isFullTime] =
    weeklyWork(dailyHoursArray);

  console.log(
    `%c********* Week's Report: *********`,
    "font-weight: bold; color: #ce3159;"
  );

  console.log(
    `%cTotal Hours Worked: %c${totalHours} hours`,
    "font-weight: normal;",
    "font-weight: bold;"
  );
  console.log(
    `%cAverage Hours Worked: %c${averageHours} hours`,
    "font-weight: normal;",
    "font-weight: bold;"
  );

  console.log(
    `%cMaximum Worked On: %c${maxDay}`,
    "font-weight: normal;",
    "font-weight: bold;"
  );
  if (daysWorked !== 1) {
    console.log(
      `%cNo. of days worked in this week: %c${daysWorked} days`,
      "font-weight: normal;",
      "font-weight: bold;"
    );
  } else {
    console.log(
      `%cNo. of days worked in this week: %c${daysWorked} day`,
      "font-weight: normal;",
      "font-weight: bold;"
    );
  }
  console.log(
    `%cFull-time? (35 hours or more): %c${isFullTime}`,
    "font-weight: normal;",
    "font-weight: bold;"
  );

  dailyHoursArray = [];
});
