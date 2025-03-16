// Divs
const errorDisplay = document.querySelector("#errorDisplay");
const successDisplay = document.querySelector("#successDisplay");

// Registration form
const registrationForm = document.querySelector("#registration");
const username = registrationForm.elements["username"];
const email = registrationForm.elements["email"];
const password = registrationForm.elements["password"];
const passwordCheck = registrationForm.elements["passwordCheck"];
const terms = registrationForm.elements["terms"];

// Login Form
const loginForm = document.querySelector("#login");
const usernameLogin = loginForm.elements["username"];
const passwordLogin = loginForm.elements["password"];
const persist = loginForm.elements["persist"];

// Show errorDisplay div in order to allow user to see the criteria they need to fix
function showError() {
  errorDisplay.style.display = "block";
}
// Hide errorDisplay div and empty its content
function hideError() {
  errorDisplay.style.display = "none";
  errorDisplay.innerHTML = "";
}
// Show successDisplay div
function showSucess() {
  successDisplay.style.display = "block";
}
// Hide successDisplay div and empty it's content
function hideSuccess() {
  successDisplay.style.display = "none";
  successDisplay.innerHTML = "";
}

// Ensures all input fields are submitted based on the criteria of each field in order to register a user
function validateRegistration(event) {
  event.preventDefault();
  // Hide errorDisplay and successDisplay
  hideError();
  hideSuccess();

  // Evaluate username, if input does not meet the criteria return it to the user
  const usernameVal = validateUsername();
  if (usernameVal === false) {
    showError();
    return false;
  }
  // Evaluate email, if input does not meet the criteria return it to the user
  const emailVal = validateEmail();
  if (emailVal === false) {
    showError();
    return false;
  }
  // Evaluate password, if input does not meet the criteria return it to the user
  const passwordVal = validatePassword();
  if (passwordVal === false) {
    showError();
    return false;
  }
  // Evaluate repeatedPassword, if input does not meet the criteria return it to the user
  const passwordCheckVal = validatePasswordCheck();
  if (passwordCheckVal === false) {
    showError();
    return false;
  }
  // Evaluate terms and condition, if input does not meet the criteria return it to the user
  const termsVal = validateTerms();
  if (termsVal === false) {
    showError();
    return false;
  }
  // Evaluates if all input fields meet criteria, if all fields are true save user information
  if (true) {
    showSucess();
    storeValues();
  }

  return true;
}

function validateUsername() {
  // The username cannot be blank.
  if (username.value === "") {
    errorDisplay.textContent = "Username cannot be blank";
    username.focus();
    return false;
  }

  // The username must be at least four characters long.
  if (username.value.length < 4) {
    errorDisplay.textContent = "Username must be atleast 4 characters long";
    username.focus();
    return false;
  }

  // The username must contain at least two unique characters.
  const listOfChars = new Set(username.value);

  if (listOfChars.size < 2) {
    errorDisplay.textContent =
      "Username must contain at least two unique characters";
    username.focus();
    return false;
  }

  // The username cannot contain any special characters or whitespace.
  if (username.value.match(/[^A-Za-z0-9]\S/)) {
    errorDisplay.textContent =
      "Username cannot contain any special characters or whitespace.";
    username.focus();
    return false;
  }

  // Registration Form - Username Validation (Part Two):
  // Now that we are storing usernames, create an additional validation rule for them...
  // Usernames must be unique ("that username is already taken" error). Remember that usernames are being stored all lowercase, so "learner" and "Learner" are not unique.

  // Get the users from localStorage
  const oldUsers = JSON.parse(localStorage.getItem("users")) || [];
  // Search the array to find if the current username is taken taking into effect usernames are stored in lowercase
  if (oldUsers.find((user) => user.username === username.value.toLowerCase())) {
    errorDisplay.textContent = "Username is already taken.";
    username.focus();
    return false;
  }

  return true;
}

function validateEmail() {
  // Get the users from localStorage
  const oldUsers = JSON.parse(localStorage.getItem("users")) || [];

  // The username cannot be blank.
  if (email.value === "") {
    errorDisplay.textContent = "Email cannot be blank";
    email.focus();
    return false;
  }

  // The email must be a valid email address.
  if (!email.value.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    errorDisplay.textContent = "Email must be a valid email address";
    email.focus();
    return false;
  }

  // The email must not be from the domain "example.com."
  if (email.value.includes("example.com")) {
    errorDisplay.textContent = "Email cannot be from the domain example.com";
    email.focus();
    return false;
  }
  // The email cannot already exist
  if (oldUsers.find((user) => user.email === email.value.toLowerCase())) {
    errorDisplay.textContent = "Email is registered to an account. Please Login.";
    email.focus();
    return false;
  }
}

function validatePassword() {
  // Passwords must be at least 12 characters long.
  if (password.value.length < 12) {
    errorDisplay.textContent = "Password must be at least 12 characters long.";
    password.focus();
    return false;
  }

  // Passwords must have at least one uppercase and one lowercase letter.
  let upperCase = /[A-Z]/;
  let lowerCase = /[a-z]/;

  if (!(upperCase.test(password.value) && lowerCase.test(password.value))) {
    errorDisplay.textContent =
      "Password must have at least one uppercase and one lowercase letter.";
    password.focus();
    return false;
  }

  // Passwords must contain at least one number.
  if (!password.value.match(/[0-9]/)) {
    errorDisplay.textContent = "Password must contain at least one number";
    password.focus();
    return false;
  }

  // Passwords must contain at least one special character.
  if (!password.value.match(/[^A-za-z0-9]/)) {
    errorDisplay.textContent =
      "Password must contain at least one special character";
    password.focus();
    return false;
  }
  // Resource: https://www.squash.io/how-to-use-regex-ignore-case-sensitivity/
  // Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).
  if (password.value.match(/password/i)) {
    errorDisplay.textContent = "Password cannot contain the word password";
    password.focus();
    return false;
  }

  // Passwords cannot contain the username.
  let containUsernameRegex = new RegExp(username.value, "i");
  if (containUsernameRegex.test(password.value)) {
    errorDisplay.textContent = "Password cannot contain username";
    password.focus();
    return false;
  }
}

function validatePasswordCheck() {
  // Repeat Password must not be empty
  if (passwordCheck.value === "") {
    errorDisplay.textContent = "Repeat Password cannot be blank";
    passwordCheck.focus();
    return false;
  }

  // Both passwords must match.
  if (passwordCheck.value !== password.value) {
    errorDisplay.textContent = "Both passwords must match.";
    passwordCheck.focus();
    return false;
  }
}

function validateTerms() {
  // The terms and conditions must be accepted.
  if (terms.checked !== true) {
    errorDisplay.textContent = "Terms and conditions must be accepted.";
    passwordCheck.focus();
    return false;
  }
}

function storeValues() {
  let usernameStorage = username.value.toLowerCase();
  let passwordStorage = password.value.toLowerCase();
  let emailStorage = email.value.toLowerCase();

  // Get the array from local Storage if there is none then create an array;
  const oldUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Create an object to store user information
  let user = {};

  // Assign key value pairs to the user object
  Object.assign(user, {
    username: `${usernameStorage}`,
    password: `${passwordStorage}`,
    email: `${emailStorage}`,
  });

  // Add the new user to the array
  oldUsers.push(user);
  // Update the array with the new user into local Storage
  localStorage.setItem("users", JSON.stringify(oldUsers));

  // Clear all form fields
  registrationForm.reset();
  // Display success message
  successDisplay.textContent = `Registration successful!`;
}

function validateLogin(event) {
  event.preventDefault();
  hideError();
  hideSuccess();

  // Evaluate usernameLogin, if input does not meet the criteria return it to the user
  const usernameLoginVal = validateUsernameLogin();
  if (usernameLoginVal === false) {
    showError();
    return false;
  }

  // Evaluate passwordLogin, if input does not meet the criteria return it to the user
  const passwordLoginVal = validatePasswordLogin();
  if (passwordLoginVal === false) {
    showError();
    return false;
  }

  // Evaluates if all input fields meet criteria, if all fields are true login the user in and display a success message
  if (true) {
    showSucess();
    validatePersist();
  }

  return true;
}

function validateUsernameLogin() {
  // Get the users from localStorage
  const oldUsers = JSON.parse(localStorage.getItem("users"));

  // Username cannot be blank
  if (usernameLogin.value === "") {
    errorDisplay.textContent = "Username cannot be blank";
    usernameLogin.focus();
    return false;
  }

  // The username must exist (within localStorage)
  if (
    !oldUsers.find(
      (user) => user.username === usernameLogin.value.toLowerCase()
    )
  ) {
    errorDisplay.textContent =
      "Username not found.Try Again or Register your account.";
    usernameLogin.focus();
    return false;
  }

  return true;
}

function validatePasswordLogin() {
  // Get the users from localStorage
  const oldUsers = JSON.parse(localStorage.getItem("users"));

  // Password cannot be blank
  if (passwordLogin.value === "") {
    errorDisplay.textContent = "Password cannot be blank";
    passwordLogin.focus();
    return false;
  }

  // Password Login value must be correct compare it to the password value in local storage
  if (
    !oldUsers.find(
      (user) => user.password === passwordLogin.value.toLowerCase()
    )
  ) {
    errorDisplay.textContent = "Password Incorrect try again.";
    passwordLogin.focus();
    return false;
  }

  return true;
}

function validatePersist() {
  // If "Keep me logged in" is checked, modify the success message to indicate this .
  if (persist.checked === true) {
    successDisplay.textContent = "Login Successful! Keeping you logged in.";
  } else {
    // If "Keep me logged in" is not checked, modify success message
    successDisplay.textContent = "Login Successful!";
  }

  // Clear all form fields
  loginForm.reset();

  return true;
}

registrationForm.addEventListener("submit", validateRegistration);
loginForm.addEventListener("submit", validateLogin);
