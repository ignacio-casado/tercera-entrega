const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/',(req, res, next)=>{
    res.render('index')
})


router.get('/signup',(req, res, next)=>{
    res.render('signup')
})

router.post('/signup', passport.authenticate('local-signup',{
    successRedirect: '/',
    failureRedirect: '/signup',
    passReqToCallback: true
}))


router.get('/signin', (req, res, next) => {
    res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  }));

const isAuthenticated = (req, res, next) =>{
    if(req.isAuntenticated()){
        return next()
    }
    res.redirect('/')
}
router.get('/profile', isAuthenticated, (req,res, next)=>{
    res.render('profile')
})

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;