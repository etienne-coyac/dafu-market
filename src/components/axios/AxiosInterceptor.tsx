// src/App.tsx or a custom setup file
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../../api/services/api";

function AxiosInterceptor({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("authToken");
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return <>{children}</>;
}

export default AxiosInterceptor;
