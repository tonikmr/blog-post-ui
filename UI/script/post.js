$(document).ready(function () {
  let quill = new Quill("#editor", {
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        ["code-block"],
      ],
    },
    placeholder: "Compose an epic...",
    theme: "snow", // or 'bubble'
  });
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("id");
  if (myParam) {
    $("#btn-publish").text("update");
    $("#btn-publish").attr("data-id", myParam);
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    let email = user[0].email;
    $.ajax({
      type: "GET",
      url: `${serviceUrlDev}getpostById?email=${email}&id=${myParam}`,
      success: function (data) {
        if (data && data.post) {
          quill.clipboard.dangerouslyPasteHTML(data.post);
        }
        console.log(data);
      },
      error: function () {
        alert("Something went wrong! Please try again later..");
      },
      //quill.setText("<div class='r'>some text</div>");
    });
  }
});

$("#btn-publish").on("click", function (event) {
  event.preventDefault();
  let id = $(this).attr("data-id");
  let myEditor = $("#editor");
  let html = myEditor[0].children[0].innerHTML;
  if (myEditor[0].children[0].innerText === "\n") {
    alert("Please write something for post");
    return;
  }
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  let postData = {
    post: html,
    email: user[0].email,
  };
  if (id) {
    postData.id = id;
  }
  $.ajax({
    data: postData,
    type: "POST",
    url: `${serviceUrlDev}${id ? "updatePost" : "post"}`,
    success: function (data) {
      let message = `Post  ${id ? "updated" : "published"} successfully.`;
      if (data && data.isCreated) {
        alert(message);
        setTimeout(() => {
          location.href = "/UI/html/viewpost.html";
        }, 200);
      }
    },
    error: function () {
      alert("Something went wrong! Please try again later..");
    },
  });
});
