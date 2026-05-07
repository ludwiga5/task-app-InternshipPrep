import type { Task } from "./types";

type TaskItemProps = {
	task: Task;
	onDelete: () => void;
	onToggle: () => void;
};

function TaskItem({ task, onDelete, onToggle }: TaskItemProps){
	return (
	  <div>
	    <input
	      type="checkbox"
	      checked={task.completed}
	      onChange={onToggle}
	    />

	    <span
	      style= {{
	        textDecoration: task.completed ? "line-through" : "none"
	      }}
	    >
	      {task.title}
	    </span>
	    <button onClick={onDelete}>Delete</button>
	  
	  </div>
	);	
}

export default TaskItem;
