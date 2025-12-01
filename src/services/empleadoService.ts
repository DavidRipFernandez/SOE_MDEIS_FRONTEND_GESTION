import http from "../api/http";
import type { ApiResponse } from "../types/api";
import type { Empleado, EmpleadoCreate } from "../types/models";

const BASE_PATH = "/api/Empleados";

const handleResponse = <T>(response: ApiResponse<T>): T => {
  if (!response.success) {
    throw new Error(
      response.message ??
        response.technicalMessage ??
        "Error al procesar la solicitud"
    );
  }
  return response.data;
};

export const empleadoService = {
  async getAll(): Promise<Empleado[]> {
    const response = await http.get<ApiResponse<Empleado[]>>(BASE_PATH);
    return handleResponse(response.data);
  },

  async getById(id: number): Promise<Empleado> {
    const response = await http.get<ApiResponse<Empleado>>(
      `${BASE_PATH}/${id}`
    );
    return handleResponse(response.data);
  },

  async create(dto: EmpleadoCreate): Promise<Empleado> {
    const response = await http.post<ApiResponse<Empleado>>(BASE_PATH, dto);
    return handleResponse(response.data);
  },

  async update(id: number, dto: EmpleadoCreate): Promise<Empleado> {
    const response = await http.put<ApiResponse<Empleado>>(
      `${BASE_PATH}/${id}`,
      dto
    );
    return handleResponse(response.data);
  },

  async remove(id: number): Promise<void> {
    const response = await http.delete<ApiResponse<null>>(
      `${BASE_PATH}/${id}`
    );
    handleResponse(response.data);
  },
};
