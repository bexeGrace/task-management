const mongoose = require('mongoose');
const { Schema } = mongoose;

const columnSchema = new Schema({
  name: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

const Column = mongoose.model('Column', columnSchema);
module.exports = Column;