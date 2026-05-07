import { useState } from "react";
import TaskItem from "./TaskItem";
import type { Task } from "./types";

function App() {

const [tasks, setTasks] = useState<Task[]>([]); // string[] tasks-set to update
const [input, setInput] = useState("");		  // gather and set user input
const trimmedInput = input.trim();

const addTask = () => {
	if(!input.trim()) return; // if input is empty exit
	setTasks([...tasks, {
		id: Date.now(),
		title: trimmedInput,
		completed: false,
	}]);
	setInput("");
};
const clearTasks = () => {
	setTasks([]);
};
const deleteTask = (idtodelete: number) => {
	setTasks(tasks.filter((task) => task.id !== idtodelete));
	//makes a copy & replaces if => condition
};
const toggleTask = (idtotoggle: number) => {
	setTasks(
		tasks.map((task) =>
			  task.id === idtotoggle
			  ? {...task, completed: !task.completed } //true
			  : task //false
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
      <button onClick={clearTasks}>Clear</button> 
      {tasks.map((task) => (
	<TaskItem
	  key={task.id}
	  task={task}
	  onDelete={() => deleteTask(task.id)}
	  onToggle={() => toggleTask(task.id)}
	/>
      ))}
    </div>
  );
}

export default App;
