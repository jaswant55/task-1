import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { getUserProjects, deleteProject } from "../../services/project.service";
import type { Project } from "../../interface/project-interface";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../redux/store/auth.slice";

export default function Dashboard() {
  const token = useSelector((state: RootState) => state.auth.token);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    const fetchProjects = async () => {
      try {
        const data = await getUserProjects(token, statusFilter);
        setProjects(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [token, statusFilter]);

  const handleEdit = (id: string) => {
    navigate(`/project/create/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id, token as string);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete project");
    }
  };
  const handleLogout = () => {
    dispatch(clearToken());
    navigate("/login");
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading projects...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6  w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Projects</h1>
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1"
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          <button
            onClick={() => navigate("/project/create")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Add Project
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {projects.length === 0 ? (
        <p>No projects found.</p>
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
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td
                  className="p-3 border-b cursor-pointer text-blue-600 hover:underline"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  {project.title}
                </td>
                <td className="p-3 border-b">{project.description}</td>
                <td className="p-3 border-b">
                  <span
                    className={`px-3 py-1 rounded text-sm ${
                      project.status === "active"
                        ? "bg-green-200 text-green-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="p-3 border-b text-center space-x-2">
                   <button
                     onClick={() => handleEdit(project.id)}
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
                    onClick={() => handleDelete(project.id)}
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
