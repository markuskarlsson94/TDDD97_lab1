window.onload = function() {
  //loadWelcome();
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
  console.log("hej");
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
    alert("password 1 too short");
    return false;
  }
  else if (pass2.length < 8)
  {
    alert("password 2 too short");
    return false;
  }
  else if (pass1 != pass2)
  {
    alert("passwords do not match");
    return false;
  }

  return true;
}
