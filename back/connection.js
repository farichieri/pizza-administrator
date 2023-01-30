require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(process.env['MONGO_URI'], {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'pizza-administator-database',
      })
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((err) => {
        console.log({ err });
        console.error('Database connection error');
      });
  }
}

module.exports = Database;
