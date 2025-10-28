import axios from "axios";
import type { Task } from "../interface/task-interface";

const API_URL = import.meta.env.VITE_API_URL;

export const getProjectTasks = async (projectId: string, token: string): Promise<Task[]> => {
    try {
        console.log('projecxtId',projectId)
        const reqBody = {
            filter: {},
            pagination: { page: 1, limit: 10 },
        };
        const res = await axios.post(`${API_URL}/projects/${projectId}/tasks/list`,reqBody, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log('res',res)
        return res.data.data;
    } catch (error: any) {
        console.error("Error fetching tasks:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to load tasks");
    }
};

export const createTask = async (projectId: string, token: string, data: any) => {
    try {
        const res = await axios.post(`${API_URL}/projects/${projectId}/tasks`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to create task");
    }
};

export const updateTask = async (taskId: string, token: string, data: any, projectId:string) => {
    try {   
        const res = await axios.patch(`${API_URL}/projects/${projectId}/tasks/${taskId}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to update task");
    }
};

export const deleteTask = async (taskId: string, token: string, projectId:string) => {
    try {
        await axios.delete(`${API_URL}/projects/${projectId}/tasks/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to delete task");
    }
};
