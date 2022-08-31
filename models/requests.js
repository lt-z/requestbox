const config = require('../lib/config');
const mongoose = require('mongoose');

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log(`error connecting to MongoDB${error.message}`);
  });

const requestsSchema = new mongoose.Schema({
  requestId: {
    type: String,
    required: true,
  },
  payLoad: {
    type: String,
    required: true,
  },
});

requestsSchema.set('toJSON', {
  // virtuals: true,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.requestId;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Requests = mongoose.model('Requests', requestsSchema);

module.exports = Requests;
