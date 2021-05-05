require('dotenv').config();
const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
// const apiRoutes = require('./routes');
const { MONGO_URL, PORT } = require('./config');

mongoose.connect(MONGO_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}, (err) => {
  if (!err) console.info(`successfully connected to database\n ${MONGO_URL}`);
  else {
    console.error(err);
    process.exit(1);
  }
});

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api', apiRoutes);

if (require.main === module) {
  app.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`);
  });
}
module.exports = app;
