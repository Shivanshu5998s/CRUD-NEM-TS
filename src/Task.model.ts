import mongoose from "mongoose";

interface TaskInterface {
  title: string;
  description: string;
  completed: boolean;
}

const taskSchema = new mongoose.Schema<TaskInterface>({
  title: String,
  description: String,
  completed: Boolean,
});

const Task = mongoose.model<TaskInterface>("Task", taskSchema);

export default Task;

// Import Mongoose: We import the mongoose library using the import syntax.
// Interface Definition: We define a TypeScript interface TaskInterface to represent the shape of our document. This provides type safety and better code completion.

// Generic Type for Schema: The mongoose.Schema constructor now uses the generic type TaskInterface to specify the shape of the documents.
// Generic Type for Model: The mongoose.model function also uses the generic type TaskInterface to specify the type of the returned model.
// Export: We export the Task model for use in other parts of your application.
