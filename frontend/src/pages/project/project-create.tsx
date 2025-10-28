import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { createProject, getProjectById, updateProject } from "../../services/project.service";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateProjectPage() {
    const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); 
  const token = useSelector((state: RootState) => state.auth.token);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "active",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!id || !token) return;

    const fetchProject = async () => {
      setLoading(true);
      try {
        const data = await getProjectById(id, token);
        setFormData({
          title: data.title,
          description: data.description,
          status: data.status,
        });
        setIsEditing(true);
      } catch (err: any) {
        setError(err.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isEditing && id) {
        await updateProject(token,id, formData);
        setSuccess("Project updated successfully!");
      } else {
        await createProject(token, formData as any);
        setSuccess("Project created successfully!");
      }
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow">
    <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-gray-700 font-medium mb-6 
                    hover:text-blue-600 transition-all duration-200 group"
        >
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200"
        >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back to Dashboard</span>
    </button>
      <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Project Title"
          className="w-full border p-2 mb-3 rounded"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="w-full border p-2 mb-3 rounded"
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        >
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isEditing ? "Update Project" : "Create Project"}
        </button>

        {error && <p className="text-red-500 mt-3">{error}</p>}
        {success && <p className="text-green-600 mt-3">{success}</p>}
      </form>
    </div>
  );
}
