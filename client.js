window.onload = function() {
  if (userLoggedIn()) {
    loadProfile();
  } else {
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
  var val = localStorage.getItem("loggedIn");
  if (val == "true") {
    return true;
  } else {
    return false;
  }
}

function validateRegisterForm() {
  var pass1 = document.getElementById("psw1").value;
  var pass2 = document.getElementById("psw2").value;

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
  return false;

  //ok it works now
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
