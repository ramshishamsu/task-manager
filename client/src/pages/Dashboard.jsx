import { useEffect, useState } from "react";
import api from "../api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  // Fetch tasks on component mount
  useEffect(() => {
    api.get("/tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  }, []);

  // Add new task
  const addTask = async () => {
    if (!title.trim()) return;
    const res = await api.post("/tasks", { title });
    setTasks([...tasks, res.data]);
    setTitle("");
  };

  // Delete task
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  // Start editing
  const startEditing = (task) => {
    setEditingId(task._id);
    setEditingTitle(task.title);
  };

  // Save edited task
  const saveEdit = async () => {
    const res = await api.put(`/tasks/${editingId}`, { title: editingTitle });
    setTasks(tasks.map(task => (task._id === editingId ? res.data : task)));
    setEditingId(null);
    setEditingTitle("");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  // Toggle task completion
  const toggleComplete = async (task) => {
    const res = await api.put(`/tasks/${task._id}`, { completed: !task.completed });
    setTasks(tasks.map(t => (t._id === task._id ? res.data : t)));
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">Task Manager</h1>
        <button onClick={logout} className="text-red-500 font-semibold hover:underline">
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Tasks</h2>

        {/* Add Task */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter a new task..."
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={addTask} className="bg-indigo-600 text-white px-5 rounded-lg hover:bg-indigo-700 transition">
            Add
          </button>
        </div>

        {/* Task List */}
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks added yet.</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map(task => (
              <li
                key={task._id}
                className="flex justify-between items-center bg-gray-50 border p-4 rounded-lg hover:shadow transition"
              >
                {editingId === task._id ? (
                  <>
                    <input
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      className="flex-1 p-2 border rounded"
                    />
                    <div className="flex gap-2 ml-2">
                      <button onClick={saveEdit} className="text-green-500 font-medium">Save</button>
                      <button onClick={cancelEdit} className="text-gray-500 font-medium">Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleComplete(task)}
                        className="w-5 h-5"
                      />
                      <span className={`text-gray-800 ${task.completed ? "line-through text-gray-400" : ""}`}>
                        {task.title}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => startEditing(task)} className="text-blue-500 font-medium">Edit</button>
                      <button onClick={() => deleteTask(task._id)} className="text-red-500 font-medium">Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
