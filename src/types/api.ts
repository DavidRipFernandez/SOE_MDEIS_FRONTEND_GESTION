// src/types/api.ts

export interface ApiResponse<T> {
  message: string | null;
  technicalMessage: string | null;
  data: T;
  statusCode: number;
  success: boolean;
}
