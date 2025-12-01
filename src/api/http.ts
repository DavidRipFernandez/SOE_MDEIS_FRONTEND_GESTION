import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// (Opcional) aquí podrías agregar interceptores de respuesta/errores.

export default http;
