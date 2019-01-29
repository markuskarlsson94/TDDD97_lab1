window.onload = function() {
  loadWelcome();
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
