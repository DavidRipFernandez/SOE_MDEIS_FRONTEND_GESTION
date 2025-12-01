import http from "../api/http";
import type { ApiResponse } from "../types/api";
import type { Cliente, ClienteCreate } from "../types/models";

const BASE_PATH = "/api/Clientes";

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

export const clienteService = {
  async getAll(): Promise<Cliente[]> {
    const response = await http.get<ApiResponse<Cliente[]>>(BASE_PATH);
    return handleResponse(response.data);
  },

  async getById(id: number): Promise<Cliente> {
    const response = await http.get<ApiResponse<Cliente>>(`${BASE_PATH}/${id}`);
    return handleResponse(response.data);
  },

  async create(dto: ClienteCreate): Promise<Cliente> {
    const response = await http.post<ApiResponse<Cliente>>(BASE_PATH, dto);
    return handleResponse(response.data);
  },

  async update(id: number, dto: ClienteCreate): Promise<Cliente> {
    const response = await http.put<ApiResponse<Cliente>>(
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
