import axios from "axios";
import Cookies from "js-cookie";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Handle FormData
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("token");
      window.location.href = "/dashboard_deazytech/login";
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    if (response.data.token) {
      Cookies.set("token", response.data.token);
    }
    return response.data;
  },
  logout: async () => {
    await api.post("/auth/logout");
    Cookies.remove("token");
  },
  getProfile: async () => {
    return (await api.get("/auth/me")).data;
  },
};

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export const projectsApi = {
  getAll: async () => {
    return (await api.get<PaginatedResponse<Project>>("/projects")).data;
  },
  get: async (id: number) => {
    return (await api.get(`/projects/${id}`)).data;
  },
  create: async (data: FormData) => {
    return (await api.post("/admin/projects", data)).data;
  },
  update: async (id: number, data: FormData) => {
    data.append("_method", "PUT");
    return (await api.post(`/admin/projects/${id}`, data)).data;
  },
  delete: async (id: number) => {
    return (await api.delete(`/admin/projects/${id}`)).data;
  },
};

export const expertsApi = {
  getAll: async () => {
    try {
      const response = await api.get("/experts");
      console.log("Get all experts response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting all experts:", error);
      throw error;
    }
  },
  get: async (id: number) => {
    try {
      const response = await api.get(`/experts/${id}`);
      console.log("Expert API Response:", response.data);
      return response.data.data; // Access the data property of the response
    } catch (error) {
      console.error("Expert API Error:", error);
      throw error;
    }
  },
  create: async (data: FormData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return (await api.post("/admin/experts", data, config)).data;
  },
  update: async (id: number, data: FormData) => {
    // Add _method field to handle PUT request with FormData
    data.append("_method", "PUT");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return (await api.post(`/admin/experts/${id}`, data, config)).data;
  },
  delete: async (id: number) => {
    return (await api.delete(`/admin/experts/${id}`)).data;
  },
};

export default api;
