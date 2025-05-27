// services/auth.js
import axios from "axios";
import type { RegisterType } from "../../types/user";

export const login = async (email: string, password: string) => {
  const response = await axios.post<{ token: string }>(
    `${import.meta.env.VITE_BASE_API_URL}/auth/login`,
    {
      email,
      password,
    }
  );
  const token = response.data.token;
  localStorage.setItem("authToken", token);
  return token;
};

export const createAccount = async (payload: RegisterType) => {
  return await axios.post(
    `${import.meta.env.VITE_BASE_API_URL}/auth/signup`,
    payload
  );
};
