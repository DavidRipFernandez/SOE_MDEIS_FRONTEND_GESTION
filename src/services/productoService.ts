import http from "../api/http";
import type { ApiResponse } from "../types/api";
import type { Producto, ProductoCreate } from "../types/models";

const BASE_PATH = "/api/Productos";

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

export const productoService = {
  async getAll(): Promise<Producto[]> {
    const response = await http.get<ApiResponse<Producto[]>>(BASE_PATH);
    return handleResponse(response.data);
  },

  async getById(id: number): Promise<Producto> {
    const response = await http.get<ApiResponse<Producto>>(`${BASE_PATH}/${id}`);
    return handleResponse(response.data);
  },

  async create(dto: ProductoCreate): Promise<Producto> {
    const response = await http.post<ApiResponse<Producto>>(BASE_PATH, dto);
    return handleResponse(response.data);
  },

  async update(id: number, dto: ProductoCreate): Promise<Producto> {
    const response = await http.put<ApiResponse<Producto>>(
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
