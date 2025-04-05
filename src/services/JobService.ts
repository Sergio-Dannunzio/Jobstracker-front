import axios from "axios";

const API_URL = "http://localhost:8000/api/jobs";

export const getJobs = async (token: string) => {
    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteJob = async (id: string, token: string) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const addJob = async (jobData: { name: string; status: string; desc: string }, token: string) => {
    const response = await axios.post(API_URL, jobData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};