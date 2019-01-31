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
  //var form = document.getElementById("registerForm");

  //var pass1 = document.getElementById("psw1").value;
  //var pass2 = document.getElementById("psw2").value;
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
  var email = form.elements["loginEmail"].value;
  var pass = form.elements["loginPassword"].value;

  //alert(email);
  //alert(pass);
  var obj = serverstub.signIn(email, pass);
  //alert(JSON.stringify(obj));

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
    //alert(obj.message);
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
    serverstub.signIn();
    alert("h");
  }
  //alert(JSON.stringify(obj));
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
