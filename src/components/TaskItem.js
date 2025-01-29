import React from 'react';

export default function TaskItem({ task, onUpdateTask, onDeleteTask }) {
  const handleStatusChange = (e) => {
    onUpdateTask({ ...task, status: e.target.value });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      onDeleteTask(task.id);
    }
  };

  return (
    <div className="border p-3 rounded mb-2 flex flex-col justify-between bg-white sm:w-auto w-52 mr-2 md:mr-0">
      <span className='pb-5'>{task.text}</span>
      <div className='md:flex md:justify-end'>
        <select value={task.status} onChange={handleStatusChange} className="border p-1 rounded md:w-auto xs:w-auto w-full">
          <option value="Backlog">Backlog</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button onClick={handleDelete} className="bg-red-500 text-white p-1 rounded md:ml-2 md:mt-0 mt-3 md:w-auto xs:w-auto w-full">Delete</button>
      </div>
    </div>
  );
}