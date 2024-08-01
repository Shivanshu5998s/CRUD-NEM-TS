// server.ts
import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import Task from "./Task.model";
import dotenv from "dotenv";

dotenv.config();
const app: Application = express();
const port: number = 8080;

const mongoURI = process.env.MONGO_URI || "";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error: Error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.use(express.json());

// Define a custom error class
class TaskNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TaskNotFoundError";
  }
}

app.get("/tasks", async (req: Request, res: Response) => {
  try {
    console.log("Getting all tasks");
    const data = await Task.find({});
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.post("/task", async (req: Request, res: Response) => {
  try {
    const newTask = new Task({
      title: "Complete TS task 10",
      description: "Complete the Basics on TS CRUD mongoose",
      completed: false,
    });

    const savedTask = await newTask.save();
    console.log(savedTask);

    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error adding task: ", error);
    res.status(500).json({ error: "Failed to add task" });
  }
});

app.patch("/task/:taskId", async (req: Request, res: Response) => {
  const taskId = req.params.taskId;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { completed: true },
      { new: true } // Return updated task doc...
    );

    if (!updatedTask) {
      // return res.status(404).json({ error: "Task not found" });
      throw new TaskNotFoundError(`Task with ID ${taskId} not found`);
    }

    console.log("Task updated: ", updatedTask);
    res.status(200).json({ updatedTask });
  } catch (error) {
    //  catch (error) {
    //   console.error("Error updating task: ", error);
    //   res.status(500).json({ error: "Failed to update task" });
    // }

    if (error instanceof TaskNotFoundError) {
      console.error("Task not found: ", error.message);
      return res.status(404).json({ error: error.message });
    } else {
      console.error("Error updating task: ", error);
      res.status(500).json({ error: "Failed to update task" });
    }
  }
});

app.delete("/task/:taskId", async (req: Request, res: Response) => {
  const taskId = req.params.taskId;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    console.log("Task deleted: ", deletedTask);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task: ", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// Start the server
app.get("/", (req: Request, res: Response) => {
  res.send("Hello TS");
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Dummy code for checking TS file
// import express, {Application, Request, Response} from 'express';

// const app: Application = express();
// const port: Number = 3000;

// app.listen(port, () => {
//     console.log(`Connected on port ${port} number`);
// });

// In this example:

// Custom Error Class: TaskNotFoundError extends the base Error class. It allows you to provide a custom message (message) and set the name property to uniquely identify this type of error.

// Usage: Inside your route handler (app.patch("/task/:taskId", ...)), when you encounter a scenario where the task is not found (!updatedTask), you throw an instance of TaskNotFoundError. This instance contains a custom error message indicating which task ID was not found.

// Error Handling: In the catch block, you check if the caught error is an instance of TaskNotFoundError. If true, you handle it specifically by logging a specific message and returning a 404 status with the error message. Otherwise, you handle other errors generically with a 500 status.

// Custom errors like TaskNotFoundError help in maintaining cleaner and more readable code by separating different error cases and providing specific error handling for each case. This approach enhances the robustness and clarity of your API implementation.
