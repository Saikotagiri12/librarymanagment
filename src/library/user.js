const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  borrowedBooksCount: { type: Number, default: 0 },
  borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});


const User = mongoose.model('User', UserSchema);

module.exports = User;
