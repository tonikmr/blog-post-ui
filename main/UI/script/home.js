$(document).ready(function () {
  getAllPost();
});

function getAllPost() {
  $.ajax({
    type: "GET",
    url: `${serviceUrlDev}getAllPost`,
    success: function (data) {
      let $card = $("#card");
      if (data && data.length) {
        data.forEach((item) => {
          let tem = `<div class="card w-100 mt-3 mb-3">
                <div class="card-header">
                    <strong>Published by ${item.email}</strong>
                </div>
                  <div class="card-body"><div>${item.post}</div>                  
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
