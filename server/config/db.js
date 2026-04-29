const mongoose = require('mongoose');

mongoose.connect(process.env.mongoDbURI)
    .then(() => {
        console.log('mongodb database connected')
    })
    .catch((e) => {
        console.error(`error connecting the database ${e.message}`)
    })
// The connection string is valid, mongodb database works, it has been tested.

const userSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true }
})

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: { type: Number, required: true, default: 0 }
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
}