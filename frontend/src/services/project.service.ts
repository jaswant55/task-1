import axios from "axios";
import type { Project } from "../interface/project-interface";

const API_URL = import.meta.env.VITE_API_URL;

const handleAxiosError = (error: any) => {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Something went wrong");
};

export const createProject = async (token: string, data: Project) => {
    try {
        const response = await axios.post(`${API_URL}/projects`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        handleAxiosError(error);
    }
};

export const getUserProjects = async (token: string, filter: string) => {
    try {
        const reqBody = {
            filter: {
                status: filter
            },
            pagination: { page: 1, limit: 10 },
        };

        const response = await axios.post(`${API_URL}/projects/list`, reqBody, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.data;
    } catch (error: any) {
        handleAxiosError(error);
    }
};

export const updateProject = async (
    token: string,
    id: string,
    data: Partial<Project>
) => {
    try {
        const response = await axios.patch(`${API_URL}/projects/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        handleAxiosError(error);
    }
};

export const deleteProject = async (id: number, token: string) => {
    try {
        const response = await axios.delete(`${API_URL}/projects/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        handleAxiosError(error);

    }
}


export const getProjectById = async (id: string, token: string): Promise<Project> => {
    try {
        const response = await axios.get(`${API_URL}/projects/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error fetching project:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch project");
    }
}
