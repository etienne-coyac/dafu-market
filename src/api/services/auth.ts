// services/auth.js
import axios from "axios";

export const login = async (email: string, password: string) => {
  const response = await axios.post<{ token: string }>(
    `${import.meta.env.VITE_BASE_API_URL}/login`,
    {
      email,
      password,
    }
  );
  const token = response.data.token;
  localStorage.setItem("authToken", token);
  return token;
};
