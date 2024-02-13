import express from 'express' 
import axios from 'axios'

// Express app
const app = express()
// Router
const router = express.Router()
// Port
const port = +process.env.PORT || 4000
// JSON URL
const dataURL = 'https://codjoelmayer.github.io/eompData/data/'
// Application Middleware
app.use(
    router
)
// / => home
router.get('^/$|/ejd', (req, res)=>{
    res.json({
        status: res.statusCode,
        msg: 'You\'re home'
    })
})
// /educations
router.get('/education', async (req, res)=>{
    // let response = await fetch(dataURL)
    // let {education} = await response.json()
    let response = await axios.get(dataURL)
    let {education} = await response.data
    res.json({
        status: res.statusCode,
        education
    })
})
// /education/:id
router.get('/education/:id', async (req, res)=>{
    let response = await fetch(dataURL)
    let {education} = await response.json()
    let params = +req.params.id
    let idx = params > 0 ? params - 1 : 0
    res.json({
        status: res.statusCode,
        education: education[idx]
    })
})
router.post('/addEducation', async (req, res)=>{
    let response = await axios.post(
        dataURL, {
            id: idx,
            year: new Date().getFullYear(),
            description: ''
        }
    )
})
router.patch('/updateEducation', (req, res)=>{

})
router.delete('/deleteEducation', (req, res)=>{

})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})