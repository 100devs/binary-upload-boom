const exampleModal = document.getElementById("myModal");
exampleModal.addEventListener("show.bs.modal", function(event) {

  const button = event.relatedTarget;
  const form = document.querySelector("#commentForm")
  const hiddenId = button.getAttribute("data-bs-id");
   const formAction = button.getAttribute("data-bs-action");
   const formMethod = button.getAttribute("data-bs-method") || 'post';  
// Extract info from data-bs-* attributes
  const modalBody = exampleModal.querySelector("#modalBody");
  const hiddenIdInput = exampleModal.querySelector('input[name="id"]')

  // change the id value each time a modal is load
	hiddenIdInput.value = hiddenId

	console.log(formMethod) 
  form.method = formMethod;
  form.action = formAction;

	console.log(formAction)
	if(formAction === '/comment/deleteComment') {
		modalBody.textContent = "Delete this comment?";		
	} else {
		addModalTextArea(modalBody)
		
		if(formAction === '/comment/editComment') {
		// For comment modification
			const commentText = exampleModal.querySelector("#commentArea");
			commentText.value = button.parentElement.previousElementSibling.textContent;
		}			
	}
});


function addModalTextArea(modalBody) {
	
	modalBody.innerHTML = '';
	// add proper textara
	modalBody.insertAdjacentHTML('afterbegin',
		'<label class="form-label" for="comment">Your comment</label><textarea class="form-control col-xs-12" rows="7" cols="50" name="comment" id="commentArea"></textarea>');

}