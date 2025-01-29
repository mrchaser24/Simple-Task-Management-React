import React from 'react';
import TaskItem from "./TaskItem";
import { Draggable } from "@hello-pangea/dnd";

export default function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  return (
    <div className='sm:block flex overflow-x-scroll'>
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TaskItem
                task={task}
                onUpdateTask={onUpdateTask}
                onDeleteTask={onDeleteTask}
              />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
}