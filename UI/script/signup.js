$(document).ready(function () {
  $(".nav-item").hide();
});
$("#signUp").on("submit", function (event) {
  event.preventDefault();
  $.ajax({
    data: {
      userName: $("#uname").val(),
      password: $("#pass").val(),
      email: $("#email").val(),
    },
    type: "POST",
    url: `${serviceUrlDev}signup`,
    success: function (data) {
      if (data && data.isExist) {
        alert("This email is already exist. Please try with another one!");
      }
      if (data && data.isCreated) {
        alert("Registered successfully. login to continue !");
        setTimeout(() => {
          location.href = "/UI/html/login.html";
        }, 200);
      }
    },
    error: function () {
      alert("Something went wrong! Please try again later..");
    },
  });
});
