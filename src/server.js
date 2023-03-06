const express = require('express')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session') 
const engine = require('ejs-mate')
const path = require('path')
const morgan = require('morgan')
const flash = require('connect-flash')

//
const app = express()
require('./passport/local-auth')
//app.set()
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine)
app.set('view engine', 'ejs')
//PORT
const PORT = process.env.PORT || 3000

//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(session({
    // key: 'user_sid',
    secret: 'nach1n',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next)=>{
    app.locals.signupMessage = req.flash('signupMessage')
    next();
})

//app.use()

// app.use(cookieParser('nach1n'))


//routes
app.use('/', require('./routes/index'))

//app.listen
app.listen(PORT, ()=>{
    console.log(`🚀Running on port ${PORT}🚀`)
})
//routes
