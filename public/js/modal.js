const exampleModal = document.getElementById("myModal");
exampleModal.addEventListener("show.bs.modal", function(event) {

  const button = event.relatedTarget;
  const form = document.querySelector("#commentForm")
  const commentId = button.getAttribute("data-bs-id");
// Extract info from data-bs-* attributes
  const modalBody = exampleModal.querySelector("#modalBody");

  // check if hidden comment id is present 
  const hiddenId = exampleModal.querySelector('input[name="id"]')
  if(hiddenId !== null) {
	  // change it value if found
	  hiddenId.value = commentId
  } else {	  
  // add the current comment id to our form
	  const el = document.createElement("input");
	  el.type = 'hidden'
	  el.name = "id";
	  el.value = commentId
	  form.appendChild(el)
  }

  form.method = 'post';


  if(button.classList.contains('editComment')) { // for delete
	addModalTextArea(modalBody)
		// For comment modification
  const commentText = exampleModal.querySelector("#commentArea");
  commentText.value = button.parentElement.previousElementSibling.textContent;
  form.action = "/comment/editComment"

  } else if(button.classList.contains('addComment')) { // for creating a new comment
	// clear the body
	addModalTextArea(modalBody)
	form.action = '/comment/createComment'
  
  } else {
		modalBody.textContent = "Delete this comment?";
		  // delete a group after confirmation
  form.action = "/comment/deleteComment"

	}

});


function addModalTextArea(modalBody) {
	
	modalBody.innerHTML = '';
	// add proper textara
	modalBody.insertAdjacentHTML('afterbegin',
		'<label class="form-label" for="comment">Your comment</label><textarea class="form-control col-xs-12" rows="7" cols="50" name="comment" id="commentArea"></textarea>');

}