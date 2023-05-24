const likeAmount = document.querySelector('.likeCount')
const btnContainer = document.querySelector('.comment--btn--container')

function positiveLikeAmount() {
  likeAmount.classList.add('comment--likes--positive')
  likeAmount.classList.remove('comment--likes--negative')
}

function negativeLikeAmount() {
  likeAmount.classList.remove('comment--likes--positive')
  likeAmount.classList.add('comment--likes--negative')
}

function handleClick(event) {
  if(event.target.classList.contains('btn')) {
    Number(likeAmount.innerText) > 0 ? positiveLikeAmount() : negativeLikeAmount();
  }
}

btnContainer.addEventListener('click', handleClick)

