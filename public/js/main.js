const popupDeleteComment = document.getElementById("popupConfirmDelete");
const popupConfirmDeleteButton = popupDeleteComment.querySelector(".popup-delete-comment");
popupConfirmDeleteButton.addEventListener("click", deleteComment);

document.getElementById("popupConfirmDelete").addEventListener("show.bs.modal", function (event) {
  console.log("show.bs.modal", event.relatedTarget);
  const button = event.relatedTarget;

  // Extract info from data-bs-* attributes
  let commentId = button.getAttribute("data-bs-id");
  console.log("ID:", commentId);
  const deleteButton = popupDeleteComment.querySelector(".popup-delete-comment");
  deleteButton.dataset.id = commentId;
});

async function deleteComment() {
  const commentId = this.dataset.id;
  try {
    const response = await fetch("/comment/deleteComment", {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        commentId: commentId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
