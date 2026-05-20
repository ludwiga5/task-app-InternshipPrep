package backend.task;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;


import java.util.List;
@RestController	//returns JSON
@RequestMapping("/api/tasks") //all methods start with /api/tasks
@CrossOrigin(origins = "http://localhost:5173") //CORS allows front-back talks
public class TaskController {

	// allows database access
	private final TaskRepository taskRepository;

	public TaskController(TaskRepository taskRepository) {
		this.taskRepository = taskRepository;
	}

	@GetMapping //HTTP GET at /api/tasks
	public List<Task> getTasks() {
		return taskRepository.findAll();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Task CreateTaskRequest(@RequestBody CreateTaskRequest request) {
					// take JSON & transform into Java object
		Task task = new Task(request.title(), false);
		return taskRepository.save(task);
	}

	@PatchMapping("/{id}")
	public Task updateTaskCompleted(
			@PathVariable Long id, 
			@RequestBody UpdateTaskRequest request
	) {
		Task task = taskRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("Task not found"));
		task.setCompleted(request.completed());

		return taskRepository.save(task);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteTask(@PathVariable long id) {
		taskRepository.deleteById(id);
	}

	@DeleteMapping
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteAllTasks() {
		taskRepository.deleteAll();
	}



}

