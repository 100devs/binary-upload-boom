// Deleting comments functionality
Array.from(deleteBtn).forEach((elem) => {
  elem.addEventListener("click", deleteComment);
});

async function deleteComment() {
  const commentId = this.parentNode.dataset.id;
  try {
    const response = await fetch("/comments", {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        commentId: commentId,
      }),
    });
    const data = await response.json();
    console.log(data);
    this.parentNode.classList.add("hidden");
  } catch (err) {
    console.log(err);
  }
}

// Creating comments functionality
async function createComment() {
  // Grabbing the question id from the DOM.
  const postId = document
    .querySelector(".addCommentForm")
    .getAttribute("data-id");
  const commentText = document.getElementById("comment").value;
  try {
    const response = await fetch("/comments", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        commentText: commentText,
        postId: postId,
      }),
    });
    const data = await response.json();
    console.log(data);
    // Everything else is just creating the new elements with the comment data and appending them to the comment section.
    const commentList = document.querySelector("ul");
    const newComment = document.createElement("li");
    const newUserName = document.createElement("p");
    const newContent = document.createElement("p");
    const newDelete = document.createElement("button");
    newComment.setAttribute("data-id", data._id);
    newUserName.textContent = data.madeBy;
    newContent.textContent = commentText;
    newDelete.textContent = "🗑️";
    newDelete.addEventListener("click", deleteComment);
    newComment.appendChild(newUserName);
    newComment.appendChild(newContent);
    newComment.appendChild(newDelete);
    commentList.appendChild(newComment);
    // Clears textarea.
    document.getElementById("comment").value = "";
  } catch (err) {
    console.log(err);
  }
}
