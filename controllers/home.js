const fetch = require('node-fetch')
global.fetch = fetch
const { createApi } = require('unsplash-js')
require('dotenv').config({ path: './config/.env' })

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_CLIENT_ID
})

module.exports = {
    getIndex: async (req,res)=>{
        let data
        await unsplash.photos.getRandom({ query: 'happy friends', orientation: 'portrait', count: 5})
        .then(result => {
            data = result.response
        })
        .catch(error => console.error(error))
        res.render('index.ejs', {data: data})            
    }
}