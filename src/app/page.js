"use client"
import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { getTasks, saveTasks } from "../utils/api";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = getTasks();
    setTasks(storedTasks);
  }, []);

  const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const onDragStart = (result) => {
    console.log("Drag Start", result.source);
  }
  const onDragUpdate = (result) => {
    console.log("Drag Location", result.destination, result.source);
  }

  const onDragEnd = (result) => {
    console.log("Drag End", result.destination, result.source);
    
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    movedTask.status = result.destination.droppableId;
    updatedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto p-4">
      <TaskForm onAddTask={addTask} />
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} onDragUpdate={onDragUpdate}>
        <div className="flex sm:flex-row flex-col sm:space-x-4 w-full">
          {["Backlog", "In Progress", "Done"].map((status) => (
            <Droppable key={status} droppableId={status} className="">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="sm:w-1/3 w-full bg-gray-200 p-4 rounded my-2"
                >
                  <h2 className="text-xl font-bold mb-4">{status}</h2>
                  <TaskList
                    tasks={tasks.filter((task) => task.status == status)}
                    onUpdateTask={updateTask}
                    onDeleteTask={deleteTask}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}