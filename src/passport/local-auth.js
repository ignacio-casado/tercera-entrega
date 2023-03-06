const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const User = require('../models/user')


passport.serializeUser((user,done)=>{
    done(null, user.id)
})

passport.deserializeUser(async(id, done)=>{
    const user = await User.findById(id)
    done(null, user)
})
passport.use('local-signup', new passportLocal ({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallBack: true

},async(req, email, password, done)=>{

    const user = User.findOne({email: email})
    if(user){
        return done(null, false, req.flash('signupMessage', 'The email is already used'))
    }else{
        const newUser = new User()
        newUser.email = email
        newUser.password = newUser.encryptPassword(password)
        await newUser.save()
        done(null, newUser)
    }
   
}))

passport.use('local-signin', new passportLocal({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallBack: true

}, async (req, email, password, done)=>{
    const user = await User.findOne({email: email})
    if(!user) {
        return done(null, false, req.flash('signinMessage', 'No User Found'));
      }
      if(!user.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
      }
      return done(null, user);

}))