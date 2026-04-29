const mongoose = require('mongoose');
const { minLength, maxLength } = require('zod');

mongoose.connect(process.env.mongoDbURI)
    .then(() => {
        console.log('mongodb database connected')
    })
    .catch((e) => {
        console.error(`error connecting the database ${e.message}`)
    })
// The connection string is valid, mongodb database works, it has been tested.

const userSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true, trim: true, lowercase: true, minLength: 3, maxLength: 30 },
    password: { type: String, required: true, minLength: 8 },
    firstName: { type: String, required: true, trim: true, maxLength: 50 },
    lastName: { type: String, required: true, trim: true, maxLength: 50 }
})

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: { type: Number, required: true }
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
}