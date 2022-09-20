const exampleModal = document.getElementById("myModal");
exampleModal.addEventListener("show.bs.modal", function(event) {

  const button = event.relatedTarget;


  if(button.classList.contains('text-danger')) {

  const button = event.relatedTarget;

  // Extract info from data-bs-* attributes
  const commentId = button.getAttribute("data-bs-id");
  const modalTitle = exampleModal.querySelector("#modalTitle");
//  modalTitle.innerHTML = '';
  const confirmDelete = exampleModal.querySelector(".btn-warning");
  modalTitle.textContent = "Delete this comment?";

  // delete a group after confirmation
  confirmDelete.addEventListener("click", async function(el) {
    try {
      const response = await fetch("/comment/deleteComment", {
        method: "delete",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          "id": commentId,
        }),
      });
      await response.json();
      location.reload();
    } catch (err) {
      console.log(err);
    }
  });
//  modalBodyInput.value = recipient

  } else {
      const form = document.querySelector("#commentForm")

  // Extract info from data-bs-* attributes
  const commentId = button.getAttribute("data-bs-id");
  const commentText = document.querySelector('#commentArea')

  commentText.value = button.parentElement.nextSibling.nextSibling.textContent

  const el = document.createElement("input");
  el.type = 'hidden'
  el.name = "id";
  el.value = commentId
   form.querySelector(".modal-body").appendChild(el)
  form.action = "/comment/editComment"
  form.method = 'post';
}

});
