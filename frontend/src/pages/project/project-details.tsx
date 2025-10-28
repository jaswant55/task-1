import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import {
  getProjectTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../services/task.service";
import type { Task } from "../../interface/task-interface";

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    if (!token || !id) return;
    const fetchData = async () => {
      try {
        const taskData = await getProjectTasks(id, token);
        setTasks(taskData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTask) {
        const updated = await updateTask(editingTask.id, token!, formData, id);
        setTasks((prev) =>
          prev.map((t) => (t.id === editingTask.id ? updated : t))
        );
        setEditingTask(null);
      } else {
        const newTask = await createTask(id!, token!, formData);
        setTasks((prev) => [...prev, newTask]);
      }
      setFormData({ title: "", description: "", status: "pending" });
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    console.log("task update", task);
    setFormData({
      title: task.title,
      description: task.description || "",
      status: task.status,
    });
  };

  const handleDelete = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(taskId, token!, id);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-500">Loading project details...</p>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-gray-700 mb-4 hover:text-blue-600 transition"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6">Project Tasks</h1>

      <form
        onSubmit={handleSubmit}
        className="mb-6 space-y-3 bg-gray-50 p-4 rounded shadow-sm"
      >
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full border p-2 rounded"
        />
        <select
          name="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="todo">TODO</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </form>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border-b">Title</th>
              <th className="p-3 border-b">Description</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{task.title}</td>
                <td className="p-3 border-b">{task.description}</td>
                <td className="p-3 border-b capitalize">
                  {" "}
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${
                      task.status === "done"
                        ? "bg-green-100 text-green-800"
                        : task.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="p-4 border-b text-center space-x-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-sm"
                    title="Edit Task"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-sm"
                    title="Delete Task"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
