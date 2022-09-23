const likeButtons = document.querySelectorAll('button.like-button') // Grab all the like buttons

Array.from(likeButtons).forEach((btn) => {
    btn.addEventListener('click', addLike) // Add a click event listener to every button
})


async function addLike() {
    const postId = this.dataset.postId // Get post ID
    const postU = this.dataset.postUser // Get post owner
    try {
        const response = await fetch(`/post/likePostFromFeed/${postId}`, {   
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                postUser: postU
            }) })  // Simple put request with post ID in the URL
        const data = await response.json() // Parse response to get new likes
        document.querySelector(`span[data-post-id='${postId}']`).innerText = data.likes // Update span with new like count and red heart
        if(data.liked) {
            document.querySelector(`button[data-post-id='${postId}']`).classList.add('liked')
        } else {
            document.querySelector(`button[data-post-id='${postId}']`).classList.remove('liked')    
        }
 
    } catch (err) {
        console.log(err)
    }
}