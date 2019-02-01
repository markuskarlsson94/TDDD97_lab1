window.onload = function() {
  if (userLoggedIn()) {
    loadHome();
  } else {
    loadWelcome();
  }

  hideErrorMessage();
}

function insertHTML(source_id, dest_id) {
  //Will paste the innerHTML of source_id into the innerHTML of dest_id
  var source = document.getElementById(source_id);
  var dest = document.getElementById(dest_id);
  dest.innerHTML = source.innerHTML;
}

function loadWelcome() {
  insertHTML("welcomeView", "content");
  hideErrorMessage();
}

function loadHome() {
  insertHTML("navbarView", "content");
  insertHTML("homeView", "loggedInContent");
  hideErrorMessage();
}

function loadBrowse() {
  insertHTML("navbarView", "content");
  insertHTML("browseView", "loggedInContent");
  hideErrorMessage();
}

function loadAccount() {
  insertHTML("navbarView", "content");
  insertHTML("accountView", "loggedInContent");
  hideErrorMessage();
}

function userLoggedIn() {
  if (localStorage.getItem("token") === null ) {
    return false;
  }
  return true;
}

function validatePassword(form) {
  var formId = form.id;
  if (formId == "registerForm") {
    var pass1 = document.getElementById("registerPass1").value;
    var pass2 = document.getElementById("registerPass2").value;
  } else if (formId == "accountForm") {
    var pass1 = document.getElementById("accountOldPassword").value;
    var pass2 = document.getElementById("accountNewPassword").value;
  }

  if (pass1.length < 8) {
    displayErrorMessage("The chosen password is too short");
    return false;
  } else if (pass1 != pass2) {
    displayErrorMessage("The passwords do not match");
    return false;
  }

  return true;
}

function validatePasswordLength(form) {
  var formId = form.id;
  if (formId == "registerForm") {
    var pass1 = document.getElementById("registerPass1").value;
    var pass2 = document.getElementById("registerPass2").value;
  } else if (formId == "accountForm") {
    var pass1 = document.getElementById("accountOldPassword").value;
    var pass2 = document.getElementById("accountNewPassword").value;
  }

  if (pass1.length < 8) {
    displayErrorMessage("The chosen password is too short");
    return false;
  }

  return true;
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
    loadHome();
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
    //signInUser(form);
    displayMessage("Succesfully registered user " + form.elements["registerEmail"].value);
  }
}

function userTryRegister(form) {
  var valid = validatePassword(form);
  if (valid == true) {
    registerUser(form);
  }
}

function userTryChangePassword(form) {
  var valid = validatePasswordLength(form);
  if (valid == true) {
    var token = localStorage.getItem("token");
    var pass1 = document.getElementById("accountOldPassword").value;
    var pass2 = document.getElementById("accountNewPassword").value;
    var obj = serverstub.changePassword(token, pass1, pass2);

    if (obj.success == false) {
      displayErrorMessage(obj.message);
    } else {
      //alert("df");
      //hideErrorMessage();
      displayMessage("Password successfully changed!");
    }
  }
}

function displayErrorMessage(message) {
  //var anchor = document.getElementById("errorMessageAnchorLoggedIn");
  //var errorHTML = document.getElementById("errorMessageHTML");
  //anchor.innerHTML = errorHTML.innerHTML;
  var error = document.getElementById("errorMessage");
  error.style.visibility = "visible";
  error.style.backgroundColor = "#db2b1a";
  var p = document.getElementById("errorMessageParagraph"); //This has to be after the first paste because it cant find the id if it's inside a script tag
  p.innerHTML=message;
}

function displayMessage(message) {
  var error = document.getElementById("errorMessage");
  error.style.visibility = "visible";
  error.style.backgroundColor = "green";
  var p = document.getElementById("errorMessageParagraph"); //This has to be after the first paste because it cant find the id if it's inside a script tag
  p.innerHTML=message;
}

function hideErrorMessage() {
    //var anchor = document.getElementById("errorMessageAnchor");
    //anchor.innerHTML = "";
    var error = document.getElementById("errorMessage");
    error.style.visibility = "hidden";
}

function getNameByToken(token) {
  var obj = serverstub.getUserDataByToken(token);
  var firstname = obj.data.firstname;
  var familyname = obj.data.familyname;
  var fullname = firstname + " " + familyname;
  return fullname;
}
