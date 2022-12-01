const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const {sequelize }= require('./models')
const AppRouter = require('./routes')



const app = express()

app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
dotenv.config({path : `${__dirname}/config/config.env`})


const API_BASE_URL = process.env.API_BASE_URL || '/api/dev'

app.use(`${API_BASE_URL}`, AppRouter)
app.get('/', (req, res) => {
    return res.json('Working')
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    sequelize.authenticate()
    console.log(`App runing on port ${port}`)
    console.log(`Database conneted`)
})