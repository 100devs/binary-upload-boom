const exampleModal = document.getElementById("myModal");
exampleModal.addEventListener("show.bs.modal", function(event) {

  const button = event.relatedTarget;
  const form = document.querySelector("#commentForm")
  const commentId = button.getAttribute("data-bs-id");
// Extract info from data-bs-* attributes
  const modalTitle = exampleModal.querySelector("#modalTitle");
console.log(commentId)
  const el = document.createElement("input");
  el.type = 'hidden'
  el.name = "id";
  el.value = commentId
  form.appendChild(el)
  form.method = 'post';


  if(button.classList.contains('text-danger')) { // for delete
//  modalTitle.innerHTML = '';
  modalTitle.textContent = "Delete this comment?";
  // delete a group after confirmation
  form.action = "/comment/deleteComment"
  } else {
      // For comment modification
  const commentText = exampleModal.querySelector("#commentArea");
  commentText.value = button.parentElement.previousElementSibling.textContent;
  form.action = "/comment/editComment"
}

});

