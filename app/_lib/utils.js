const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

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
