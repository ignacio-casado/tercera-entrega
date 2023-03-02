const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
    email: String,
    password: String
})

userSchema.methods.encryptPassword = (password) =>{
    return bc.bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

module.exports = mongoose.model('user', userSchema)