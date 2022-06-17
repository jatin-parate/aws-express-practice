import { Schema, model } from 'mongoose';

export interface TodoData {
  name: string;
  expires: Date;
  priority: 1 | 2 | 3;
  username: string;
}

const todosSchema = new Schema<TodoData>({
  name: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
    min: 1,
    max: 3,
    default: 3,
  },
  username: {
    type: String,
    required: true,
  },
});

const Todo = model('Todo', todosSchema);

export default Todo;
