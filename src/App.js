"use client"
import React from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management App</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;