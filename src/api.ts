import axios from "axios";
import { User, Location } from "./types";

const API_URL = "http://localhost:5000/api";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const addUser = async (user: Omit<User, "id">): Promise<User> => {
  const response = await axios.post(`${API_URL}/users`, user);
  return response.data;
};

export const updateUser = async (user: User): Promise<User> => {
  const response = await axios.put(`${API_URL}/users/${user.id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/users/${id}`);
};

export const fetchCurrentLocation = async (): Promise<Location> => {
  const response = await axios.get(`${API_URL}/location`);
  return response.data;
};
