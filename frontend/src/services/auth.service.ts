import type { LoginForm } from "../interface/login-interface";
import type { RegisterForm } from "../interface/regsiter-interface";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const handleError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  } else if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};

export const login = async (data: LoginForm) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data; 
  } catch (error: unknown) {
    throw new Error(handleError(error));
  }
};

export const register = async (data: RegisterForm) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  } catch (error: unknown) {
    throw new Error(handleError(error));
  }
};