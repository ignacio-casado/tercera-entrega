const express = require('express')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session') 
const passportLocal = require('passport-local').Strategy
const engine = require('ejs-mate')
const path = require('path')
const morgan = require('morgan')

const app = express()
//app.set()
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine)
app.set('view engine', 'ejs')
//PORT
const PORT = process.env.PORT || 3000

//middlewares
app.use(morgan('dev'))
//app.use()

app.use(express.urlencoded({extended: true}))
app.use(cookieParser('nach1n'))
app.use(session({
    // key: 'user_sid',
    secret: 'nach1n',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new passportLocal((username, password,done)=>{

}))

//routes
app.use('/', require('./routes/index'))

//app.listen
app.listen(PORT, ()=>{
    console.log(`🚀Running on port ${PORT}🚀`)
})
//routes
