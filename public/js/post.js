const exampleModal = document.getElementById("myModal");
exampleModal.addEventListener("show.bs.modal", function(event) {

  const button = event.relatedTarget;

  // Extract info from data-bs-* attributes
  const commentId = button.getAttribute("data-bs-id");
  const commentText = document.querySelector('#commentArea')
  commentText.value = button.parentElement.nextSibling.nextSibling.textContent

  const el = document.createElement("input");
  el.type = 'hidden'
  el.name = "id";
  el.value = commentId
  const form = document.querySelector("#commentForm > .modal-body");
  form.appendChild(el);

});
