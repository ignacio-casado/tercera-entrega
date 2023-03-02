const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const User = require('../models/user')

passport.serializeUser((user,done)=>{
    done(null, user.id)
})
passport.use('local-signup', new passportLocal ({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallBack: true

},async(req, email, password, done)=>{
    const user = new User()
    user.email = email
    user.password = password
    await user.save()
    done(null, user)
}))