const taskSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: String,
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium'
    },
    status: {
      type: String,
      enum: ['not started', 'in progress', 'completed'],
      default: 'not started'
    },
    dueDate: Date,
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const Task = mongoose.model('Task', taskSchema);
  module.exports = Task;
  