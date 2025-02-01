import mongoose, {Schema} from "mongoose";

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
}, {timestamps: true});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;