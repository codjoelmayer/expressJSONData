import express from 'express' 
import axios from 'axios'
import bodyParser from 'body-parser'
import cors from 'cors'
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
    express.json(),
    express.urlencoded({
        extended: true
    }),
    cors(),
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
    try{
        let response = await axios.get(dataURL)
        let {education} = await response.data
        res.json({
            status: res.statusCode,
            education
        })    
    }catch(e){
        res.json({
            status: res.statusCode, 
            msg: 'Please try again later.'
        })
    }
})
// /education/:id
router.get('/education/:id', async (req, res)=>{
    try{
        let response = await fetch(dataURL)
        let {education} = await response.json()
        let params = +req.params.id
        let idx = params > 0 ? params - 1 : 0
        res.json({
            status: res.statusCode,
            education: education[idx]
        })
    }catch(e){
        res.json({
            status: res.statusCode, 
            msg: 'Please try again later.'
        })
    }
})
router.post('/addEducation', 
bodyParser.json(), async (req, res)=>{
    try{
        let dataRes = await 
        axios.post(dataURL, req.body)
        if(dataRes){
            /*
            Please remove all consoles before you can deploy your backend.
            */
            console.log(resVal.data);
            res.json({
                status: res.statusCode,
                msg: 'New record was added'
            })
        }
    }catch(e) {
        console.log(e.message);
        // 
        res.json({
            status: res.statusCode,
            msg: 'An error occurred when adding a new data'
        })

    }
    // Below are some other examples that you can use.
    // let response = await axios.post(
    //     dataURL, req.body
    // )
    // let payload = req.body
    // let response = await axios.post(
    //     dataURL, {
    //         id: payload.id,
    //         year: payload.year,
    //         description: payload.description,
    //         place: payload.place,
    //         type: payload.type,
    //         certificate: payload.certificate
    //     }
    // )
})
router.patch('/updateEducation/:id',bodyParser.json(), (req, res)=>{
    //axios.patch(`${dataURL}`, )
})
router.delete('/deleteEducation/:id', 
async (req, res)=>{
    let dataRes = await axios.delete(`${dataURL}/${+req.params.id}`, )
    if(dataRes) {
        res.json({
            status: res.statusCode,
            msg: 'A record was removed'
        })
    }
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})