document.querySelector('#getButton').addEventListener('click', langRequest)

async function langRequest() {
    const languageName = document.querySelector('input').value
    try {
        const res = await fetch(`https://g-lang-api.herokuapp.com/api/${languageName}`)
        const data = await res.json()
        console.log(data)

    } catch(error) {
        console.log(error)
    }
} 
// does it matter that the const doesn't match the model?