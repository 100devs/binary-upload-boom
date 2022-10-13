document.querySelector('#getButton').addEventListener('click', langRequest)

async function langRequest() {
    const langName = document.querySelector('input').value
    try {
        const res = await fetch(`https://${langName}`)
        const data = await res.json()
        console.log(data)

    } catch(error) {
        console.log(error)
    }
} 