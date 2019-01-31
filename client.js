window.onload = function() {
  if (userLoggedIn()) {
    alert("user logeed in");
    loadProfile();
  } else {
    alert("uder not signed in");
    loadWelcome();
  }
}

function loadProfile() {
  var html = document.getElementById("profileView");
  var cont = document.getElementById("content");
  cont.innerHTML=html.innerHTML;
}

function loadWelcome() {
  var html = document.getElementById("welcomeView");
  var cont = document.getElementById("content");
  cont.innerHTML=html.innerHTML;
}

function logIn() {
  localStorage.setItem("loggedIn","true");
  loadProfile();
}

function logOut() {
  localStorage.setItem("loggedIn","false");
  loadWelcome();
}

function userLoggedIn() {
  if (localStorage.getItem("token") === null ) {
    return false;
  }
  return true;
}

function validateRegisterForm(form) {
  var pass1 = document.getElementById("registerPass1").value;
  var pass2 = document.getElementById("registerPass2").value;

  if (pass1.length < 8)
  {
    displayErrorMessage("The chosen password is too short");
    return false;
  }
  else if (pass1 != pass2)
  {
    displayErrorMessage("The passwords do not match");
    return false;
  }

  hideErrorMessage();
}

function signInUser(form) {
  var formId = form.id;

  if (formId == "loginForm") {
    var email = form.elements["loginEmail"].value;
    var pass = form.elements["loginPassword"].value;
  } else if (formId == "registerForm") {
    var email = form.elements["registerEmail"].value;
    var pass = form.elements["registerPass1"].value;
  }

  var obj = serverstub.signIn(email, pass);

  if (obj.success == false) {
    displayErrorMessage(obj.message);
  }
  else {
    hideErrorMessage();
    loadProfile();
    localStorage.setItem("token", obj.data);
  }
}

function signOutUser() {
  var token = localStorage.getItem("token");
  var obj = serverstub.signOut(token);

  if (obj.success == false) {
    displayErrorMessage(obj.message);
  } else {
    localStorage.removeItem("token");
    loadWelcome();
  }
}

function registerUser(form) {
  var user = {email: form.elements["registerEmail"].value, password: form.elements["registerPass1"].value,
              firstname: form.elements["registerFirstName"].value, familyname: form.elements["registerFamilyName"].value,
              gender: form.elements["registerGender"].value, city: form.elements["registerCity"].value,
              country: form.elements["registerCountry"].value};

  var obj = serverstub.signUp(user);

  if (obj.success == false) {
    displayErrorMessage(obj.message);
  } else {
    signInUser(form);
  }
}

function displayErrorMessage(message) {
  var anchor = document.getElementById("errorMessageAnchor");
  var errorHTML = document.getElementById("errorMessageHTML");
  anchor.innerHTML = errorHTML.innerHTML;
  var p = document.getElementById("errorMessageParagraph"); //This has to be after thr first paste because it cant find the id if it's inside a script tag
  p.innerHTML=message;
}

function hideErrorMessage() {
    var anchor = document.getElementById("errorMessageAnchor");
    anchor.innerHTML = "";
}
