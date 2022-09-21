const modal = document.getElementById("myModal");

modal.addEventListener("show.bs.modal", function(event) {
	const form = document.getElementById("modalForm");
	const modalData = event.relatedTarget.dataset;
	console.log(modalData)

	form.action = modalData['formaction'];
	if (modalData['enctype']) form.enctype = modalData['enctype'];
	document.getElementById('modalTitle').innerText = modalData['modaltitle'];
	const formContent = document.getElementById(modalData['formcontent']);
	formContent.style.display = "block";
	document.getElementById('formContent').append(formContent);
	document.getElementById('submitButton').innerText = modalData['submitbutton'];
	if (modalData['comment']) {
		document.getElementById('commentArea').value = modalData['comment'];
	}
	if (modalData['title']) {
		document.getElementById('title').value = modalData['title'];
	}
		if (modalData['caption']) {
		document.getElementById('caption').value = modalData['caption'];
	}
	if (modalData['deletetype']) {
		document.getElementById('deleteType').innerText = modalData['deletetype'];
	} 
});

modal.addEventListener("hide.bs.modal", function(event) {
	const modalData = event.relatedTarget.dataset;
	const formContent = document.getElementById(modalData['formcontent']);
	formContent.style.display = "none";
});


function addModalTextArea(modalBody) {
	
	modalBody.innerHTML = '';
	// add proper textara
	modalBody.insertAdjacentHTML('afterbegin',
		'<label class="form-label" for="comment">Your comment</label><textarea class="form-control col-xs-12" rows="7" cols="50" name="comment" id="commentArea"></textarea>');

}