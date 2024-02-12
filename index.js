import express from 'express' 
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
    let response = await fetch(dataURL)
    let {education} = await response.json()
    res.json({
        status: res.statusCode,
        education
    })
})
// /education/:id
router.get('/education/:id', async (req, res)=>{
    let response = await fetch(dataURL)
    let {education} = await response.json()
    res.json({
        status: res.statusCode,
        education: education[+req.params.id - 1]
    })
})
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})