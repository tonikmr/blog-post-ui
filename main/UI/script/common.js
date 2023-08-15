$(document).ready(function () {
  let user = localStorage.getItem("user");
  if (user === null) {
    $("#spn-username").text("");
    $("#logInBtn").text("Login");
    location.href = "/main/UI/html/login.html";
  } else {
    let parsedUser = JSON.parse(user);
    $("#logInBtn").text("Logout");
    $("#spn-username").text(parsedUser[0].userName);
    // location.href = "/UI/html/post.html";
  }
});

$("#logInBtn").on("click", function () {
  let user = localStorage.getItem("user");
  if (user === null) {
    location.href = "/main/UI/html/login.html";
  } else {
    localStorage.removeItem("user");
    $("#logInBtn").text("Login");
    location.href = "/main/UI/html/login.html";
  }
});
