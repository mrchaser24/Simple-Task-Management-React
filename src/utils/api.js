export const getTasks = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const addTask = (task) => {
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
};

export const updateTask = (updatedTask) => {
  const tasks = getTasks().map(task => 
    task.id === updatedTask.id ? updatedTask : task
  );
  saveTasks(tasks);
};

export const deleteTask = (taskId) => {
  const tasks = getTasks().filter(task => task.id !== taskId);
  saveTasks(tasks);
};