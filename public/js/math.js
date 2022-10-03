console.log('hello from math js')


let productReturn = 0

const randomNumberOneTo = (x) => {
  return Math.ceil(Math.random()*x)
};

const randomFact = (timesTable,num) => {
  return Object.keys(timesTable)[num]
}

const sevenTimesTable = {
  '7 x 1':7,
  '7 x 2':14,
  '7 x 3':21,
  '7 x 4':28,
  '7 x 5':35,
  '7 x 6':42,
  '7 x 7':49,
  '7 x 8':56,
  '7 x 9':63,
  '7 x 10':70,
  '7 x 11':77,
  '7 x 12':84
}



//set inner html to a random multiplication fact
const displayFact = () => {
    //get a random number
    let randomNum = randomNumberOneTo(3)-1;
    //use random number to access a random key in the times table object
    let randomFactReturn = randomFact(sevenTimesTable,randomNum)
    console.log(randomFactReturn)
    //product of first and second factors
    let product = (
      randomFactReturn.split(' ')[0] *
      randomFactReturn.split(' ')[2]
      )

    console.log(product)

    testingFacts.innerText = randomFactReturn
    productReturn = product
}

window.onload = function() {
  displayFact();
};

/* ***********Multiplication Input************ */
const practiceMultiplyingButton = document.getElementById('practice-multiplying-button')
const practiceMultiplyingInput = document.getElementById('practice-multiplying-input')
const multiplicationFact = document.querySelector('.multiplication-fact')
const testingFacts = document.querySelector('#testing-facts')
const numberCorrect = document.querySelector('#number-correct')
const numberWrong = document.querySelector('#number-wrong')

practiceMultiplyingButton.addEventListener('click', checkMultiplication)


let correctCount = 0
let wrongCount = 0
function checkMultiplication() {

  if (practiceMultiplyingInput.value == productReturn) {
    console.log('You got it right!')
    correctCount++
    numberCorrect.innerText =  correctCount
  } else {
    wrongCount++
    console.log('Try again!')
    numberWrong.innerText =  wrongCount
  }

  displayFact();
}




/* ***********Flip Card with JS************ */

var cards = document.querySelectorAll('.card');

[...cards].forEach((card)=>{
  card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
  });
});

//when newCardButton is clicked, the card is flipped to the front
const newCardButton = document.querySelector('.newCardButton');

[...cards].forEach((card)=>{
    newCardButton.addEventListener( 'click', function() {
      card.classList.toggle('.card__face--front');
    });
  });




// ***********************************************



function randomNumberOneToFive(){
    return Math.ceil(Math.random()*5)
}

// document.querySelector('.newCardButton').addEventListener('click', apiRequest)

// async function apiRequest(){
//     //const timestables = document.querySelector('input').value
//     let zeroToFour = randomNumberOneToFive() - 1;

//     try{
//         //const response = await fetch(`https://mathapirockit.herokuapp.com/api/${workout}`)
//         const response = await fetch(`https://mathapirockit.herokuapp.com/api/multiply`)
//         const data = await response.json()

//         console.log(data)
//         console.log(zeroToFour)

//         document.querySelector('.card__face--front').innerText = data[zeroToFour]['factors']
//         document.querySelector('.card__face--back').innerText = data[zeroToFour]['product']


//     }catch(error){
//     console.log(error)
// }
// }
