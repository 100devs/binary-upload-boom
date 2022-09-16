const delCommentBtn = document.querySelectorAll('.deleteBtn')
delCommentBtn.forEach(item => item.addEventListener('click',async function(event){
    const commentId = this.dataset.id;
    try{
        await fetch('/comment/deleteComment', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                commentId,
                postId
            })
        });
        location.reload();
    }catch(err){
        console.log(err)
    }
}));