// ===== CLIENTE =====
export interface Cliente {
  clienteId: number;
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  email?: string | null;
  telefono?: string | null;
  direccion?: string | null;
  fechaRegistro: string;
  activo: boolean;
}

export interface ClienteCreate {
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  activo?: boolean;
}

// ===== PRODUCTO =====
export interface Producto {
  productoId: number;
  codigo: string;
  nombre: string;
  descripcion?: string | null;
  categoria?: string | null;
  precioUnitario: number;
  stockActual: number;
  fechaRegistro: string;
  activo: boolean;
}

export interface ProductoCreate {
  codigo: string;
  nombre: string;
  descripcion?: string | null;
  categoria?: string | null;
  precioUnitario: number;
  stockActual: number;
  activo?: boolean;
}

// ===== EMPLEADO =====
export interface Empleado {
  empleadoId: number;
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  cargo: string;
  email?: string | null;
  telefono?: string | null;
  fechaContratacion: string; // date en backend, string en frontend
  salarioMensual: number;
  activo: boolean;
}

export interface EmpleadoCreate {
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  cargo: string;
  email?: string;
  telefono?: string;
  fechaContratacion: string;
  salarioMensual: number;
  activo?: boolean;
}
