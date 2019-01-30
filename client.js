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
