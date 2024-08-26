const express = require('express');
const mongoose = require('mongoose');
const libraryRouter = require('./src/library/controller');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/library', libraryRouter);

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/library';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
