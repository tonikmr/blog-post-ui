$(document).ready(function () {
  $(".nav-item").hide();
  let user = localStorage.getItem("user");
  if (user !== null) {
    location.href = "/UI/html/post.html";
  }
});
$("#login-form").on("submit", function (event) {
  event.preventDefault();
  $.ajax({
    data: {
      password: $("#pass").val(),
      email: $("#email").val(),
    },
    type: "POST",
    url: `${serviceUrlDev}login`,
    success: function (data) {
      if (data && data.isExist) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Log in successfully.");
        setTimeout(() => {
          location.href = "/index.html";
        }, 200);
      }
      if (data && !data.isExist) {
        alert("User not registered. Try with different email address");
      }
    },
    error: function () {
      alert("Something went wrong! Please try again later..");
    },
  });
});
