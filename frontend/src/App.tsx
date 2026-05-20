import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import type { Task } from "./types";

function App() {

const API_URL = "http://localhost:8080/api/tasks";
const [tasks, setTasks] = useState<Task[]>([]); // string[] tasks-set to update
const [input, setInput] = useState("");		  // gather and set user input
const trimmedInput = input.trim();

const fetchTasks = async () => {
  	const response = await fetch(API_URL);
  	const data: Task[] = await response.json();
  	setTasks(data);
};

useEffect(() => {
  fetchTasks();
}, []);

const addTask = async () => {
  const trimmedInput = input.trim();

  if (!trimmedInput) return;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: trimmedInput,
    }),
  });

  const createdTask: Task = await response.json();

  setTasks([...tasks, createdTask]);
  setInput("");
};

const deleteTask = async (idToDelete: number) => {
  await fetch(`${API_URL}/${idToDelete}`, {
    method: "DELETE",
  });

  setTasks(tasks.filter((task) => task.id !== idToDelete));
};

const deleteAllTasks = async () => {
	await fetch(`${API_URL}`, {
		method: "DELETE",
	});

	setTasks([]);
};

const toggleTask = async (taskToToggle: Task) => {
  const response = await fetch(`${API_URL}/${taskToToggle.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: !taskToToggle.completed,
    }),
  });

  const updatedTask: Task = await response.json();

  setTasks(
    tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    )
  );
};

return (
    <div>
      <h1>Task App</h1>
      <input
      	value={input}
        onChange={(e) => setInput(e.target.value)}
      /> 
      <button onClick={addTask}>Add</button>
      <button onClick={deleteAllTasks}>Clear</button> 
      {tasks.map((task) => (
	<TaskItem
	  key={task.id}
	  task={task}
	  onDelete={() => deleteTask(task.id)}
	  onToggle={() => toggleTask(task)}
	/>
      ))}
    </div>
  );
}

export default App;
