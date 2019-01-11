require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const {SERVER_PORT, CONNECTION_STRING, SECRET} = process.env
const controller = require('./controller')

const app = express()

app.use(express.static(`${__dirname}/../build/`))
app.use(express.json())
app.use(session({
    secret: SECRET,
    saveUninitialized: false,
    resave: false
}))

// ENDPOINTS
app.post('/auth/register', controller.register)
app.post('/auth/login', controller.login)

app.get('/api/posts', controller.getAllPosts)
app.get('/api/post/:id', controller.getPost)

app.post('/api/post/:id', controller.newPost)

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} puppies!`))
})