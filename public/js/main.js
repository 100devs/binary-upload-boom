const popupDeleteComment = document.getElementById("popupConfirmDelete");
const popupConfirmDeleteButton = popupDeleteComment.querySelector(".popup-delete-item");
popupConfirmDeleteButton.addEventListener("click", deleteItem);

// "show.bs.modal" is an event fired when the confirm delete modal is displayed.
// We use this to grab the id and type of the item being deleted, which we assign
// to the data attributes of the delete button on the modal itself.
// This allows the modal to know what it is attempting to do, and its event handler
// can decide accordingly.
document.getElementById("popupConfirmDelete").addEventListener("show.bs.modal", function (event) {
  console.log("show.bs.modal", event.relatedTarget);
  const button = event.relatedTarget;

  // Extract info from data-bs-* attributes of the button that was clicked to summon this modal
  let itemId = button.getAttribute("data-bs-id");
  let type = button.getAttribute("data-bs-what");
  console.log("ID:", type, itemId);

  // Grabs the span in the modal dialogue so we can insert what type of item to delete
  const itemText = popupDeleteComment.querySelector("#item-to-delete");
  itemText.innerHTML = type;

  // Sets the data attributes of the modal delete button to the item we wish to delete
  const deleteButton = popupDeleteComment.querySelector(".popup-delete-item");
  deleteButton.dataset.id = itemId;
  deleteButton.dataset.type = type;
});

// Generic delete function, examines the data attributes of the button
// to decide which delete function to call.
async function deleteItem() {
  let itemId = this.dataset.id;
  let type = this.dataset.type;
  console.log("DELETING THESE:", itemId, type);
  if (type === "post") {
    deletePost(itemId);
  } else if (type === "comment") {
    deleteComment(itemId);
  }
}

// Deletes a comment
async function deleteComment(commentId) {
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

// Deletes an entire post with comments, and redirects to the profile page
async function deletePost(postId) {
  try {
    const response = await fetch("/post/deletePost/" + postId, {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        postId: postId,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data == "Deleted Post") {
      window.location = "/profile";
    } else {
      console.log("Something went wrong with the delete!");
    }
  } catch (err) {
    console.log(err);
  }
}
