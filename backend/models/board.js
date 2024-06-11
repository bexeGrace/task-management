const mongoose = require('mongoose');
const { Schema } = mongoose;

const boardSchema = new Schema({
  title: { type: String, required: true },
  columns: [{ type: Schema.Types.ObjectId, ref: 'Column' }]
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
