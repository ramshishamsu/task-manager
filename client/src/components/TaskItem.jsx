import api from "../api";

function TaskItem({ task, tasks, setTasks }) {
  const deleteTask = async () => {
    await api.delete(`/tasks/${task._id}`);
    setTasks(tasks.filter(t => t._id !== task._id));
  };

  return (
    <div>
      {task.title}
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
}

export default TaskItem;
