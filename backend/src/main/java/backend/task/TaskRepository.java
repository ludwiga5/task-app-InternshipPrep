package backend.task;

import org.springframework.data.jpa.repository.JpaRepository;

/*
 * Database Access layer.
 * extends JpaRepository gives:
 * findall(), findById(), save(), deleteById()
*/
public interface TaskRepository extends JpaRepository<Task, Long> {
}

