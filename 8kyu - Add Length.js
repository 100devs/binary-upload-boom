/* What if we need the length of the words separated by a space to be added at the end of that same word and have it returned as an array?

Example(Input --> Output)

"apple ban" --> ["apple 5", "ban 3"]
"you will win" -->["you 3", "will 4", "win 3"]
Your task is to write a function that takes a String and returns an Array/list with the length of each word added to each element .

Note: String will have at least one element; words will always be separated by a space. */



//p add word length to the end of each word in a string and output array
//r array
//e "apple ban" => ['apple 5', 'ban 3']
//p split str, run forEach replacing the element with element + + element.length



function addLength(str) {
    let arr = str.split(' ')
    let arr2 = []
    arr.map(element => {
      arr2.push(`${element} ${element.length}`)
    })
    return arr2
  }
  

// or
/* function addLength(str){
    return str.split(" ").map(element => `${element} ${element.length}`)
} */