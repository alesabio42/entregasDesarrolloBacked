// models/passwordResetToken.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passwordResetTokenSchema = new Schema({
    email: { type: String, required: true },
    token: { type: String, required: true },
    expires: { type: Date, required: true }
});

const PasswordResetToken = mongoose.model('PasswordResetToken', passwordResetTokenSchema);

module.exports = PasswordResetToken;
