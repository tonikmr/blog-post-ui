$(document).ready(function () {
  getAllPost();
});

function getAllPost() {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  let email = user[0].email;

  $.ajax({
    type: "GET",
    url: `${serviceUrlDev}getpost?email=${email}`,
    success: function (data) {
      let $card = $("#card");
      if (data && data.isExist && data.post.length) {
        data.post.forEach((item) => {
          let tem = `<div class="card w-100 mt-3">
                <div class="card-header">
                    <strong>Post</strong>
                </div>
                  <div class="card-body"><div>${item.post}</div>
                    <div class="d-flex justify-content-end">
                        <button type="button" id="edit" href="#" class="btn btn-dark mx-2" data-id= ${item.id}>Edit</a>
                            <button type="button" id="delete" class="btn btn-dark" data-id= ${item.id}>Delete</a>
                    </div>
                    </div>
                </div>
                 `;
          $card.append(tem);
        });
      } else {
        $card.empty();
      }
    },
    error: function () {
      alert("Something went wrong! Please try again later..");
    },
  });
}

$(document).on("click", "#delete", function () {
  let id = $(this).attr("data-id");
  var result = confirm("Want to delete?");
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  let email = user[0].email;
  if (result) {
    $.ajax({
      type: "DELETE",
      data: { id, email },
      url: `${serviceUrlDev}deletepost`,
      success: function (data) {
        if (data && data.isDeleted) {
          getAllPost();
        }
      },
      error: function () {
        alert("Something went wrong! Please try again later..");
      },
    });
  }
});

$(document).on("click", "#edit", function () {
  let id = $(this).attr("data-id");
  location.href = `/UI/html/post.html?id=${id}`;
});
