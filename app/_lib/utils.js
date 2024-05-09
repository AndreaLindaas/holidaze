const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
import moment from "moment";

export const validateEmail = (email) => {
  const emailFound = emailPattern.test(email);
  if (emailFound) {
    if (email.includes("stud.noroff.no")) {
      return true;
    } else {
      return false;
    }
  }
  return emailFound;
};

const namePattern = /^[a-zA-Z0-9_]+$/;
export const validateName = (name) => {
  return namePattern.test(name);
};

export const getTimestampsBetweenDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  // Array to store timestamps
  const timestamps = [];

  // Iterate through each day between start and end dates
  const currentDate = new Date(start);
  currentDate.setHours(0);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);
  while (currentDate <= end) {
    // Store timestamp for current date
    timestamps.push(moment(currentDate.getTime()));

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return timestamps;
};
