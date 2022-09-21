const modal = document.getElementById("myModal");

modal.addEventListener("show.bs.modal", function(event) {
	const form = document.getElementById("modalForm");
	const modalData = event.relatedTarget.dataset;
	console.log(modalData)

	form.action = modalData['formaction'];
	document.getElementById('modalTitle').innerText = modalData['modaltitle'];
	const formContent = document.getElementById(modalData['formcontent']);
	formContent.style.display = "block";
	document.getElementById('formContent').append(formContent);
	document.getElementById('submitButton').innerText = modalData['submitbutton'];
	if (modalData['comment']) {
		console.log(document.getElementById('commentArea'), modalData['comment'])
		document.getElementById('commentArea').value = modalData['comment'];
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

