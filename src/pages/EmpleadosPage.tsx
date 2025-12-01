import React, { useEffect, useState } from "react";
import { empleadoService } from "../services/empleadoService";
import type { Empleado, EmpleadoCreate } from "../types/models";

type EmpleadoFormState = {
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  cargo: string;
  email: string;
  telefono: string;
  fechaContratacion: string; // yyyy-MM-dd
  salarioMensual: string;
  activo: boolean;
};

const emptyForm: EmpleadoFormState = {
  tipoDocumento: "",
  numeroDocumento: "",
  nombres: "",
  apellidos: "",
  cargo: "",
  email: "",
  telefono: "",
  fechaContratacion: "",
  salarioMensual: "",
  activo: true,
};

const EmpleadosPage: React.FC = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [form, setForm] = useState<EmpleadoFormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = editingId !== null;

  const loadEmpleados = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await empleadoService.getAll();
      setEmpleados(data);
    } catch (err: any) {
      setError(err.message ?? "Error al obtener empleados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadEmpleados();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dto: EmpleadoCreate = {
      tipoDocumento: form.tipoDocumento,
      numeroDocumento: form.numeroDocumento,
      nombres: form.nombres,
      apellidos: form.apellidos,
      cargo: form.cargo,
      email: form.email || undefined,
      telefono: form.telefono || undefined,
      fechaContratacion: form.fechaContratacion,
      salarioMensual: Number(form.salarioMensual),
      activo: form.activo,
    };

    try {
      setLoading(true);
      setError(null);

      if (isEditing && editingId !== null) {
        await empleadoService.update(editingId, dto);
      } else {
        await empleadoService.create(dto);
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadEmpleados();
    } catch (err: any) {
      setError(err.message ?? "Error al guardar el empleado");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (empleado: Empleado) => {
    setEditingId(empleado.empleadoId);
    setForm({
      tipoDocumento: empleado.tipoDocumento,
      numeroDocumento: empleado.numeroDocumento,
      nombres: empleado.nombres,
      apellidos: empleado.apellidos,
      cargo: empleado.cargo,
      email: empleado.email ?? "",
      telefono: empleado.telefono ?? "",
      fechaContratacion: empleado.fechaContratacion.substring(0, 10), // yyyy-MM-dd
      salarioMensual: String(empleado.salarioMensual),
      activo: empleado.activo,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este empleado?")) return;
    try {
      setLoading(true);
      setError(null);
      await empleadoService.remove(id);
      await loadEmpleados();
    } catch (err: any) {
      setError(err.message ?? "Error al eliminar el empleado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "24px",
      }}
    >
      {/* FORMULARIO */}
      <section
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
        }}
      >
        <h2 style={{ marginBottom: "12px" }}>
          {isEditing ? "Editar Empleado" : "Nuevo Empleado"}
        </h2>

        {error && (
          <div
            style={{
              marginBottom: "12px",
              padding: "8px 12px",
              borderRadius: "8px",
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "8px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <div style={{ flex: 1 }}>
              <label>Tipo documento</label>
              <select
                name="tipoDocumento"
                value={form.tipoDocumento}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "6px" }}
              >
                <option value="">Seleccione...</option>
                <option value="CI">CI</option>
                <option value="NIT">NIT</option>
                <option value="PASAPORTE">Pasaporte</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label>Número documento</label>
              <input
                name="numeroDocumento"
                value={form.numeroDocumento}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "6px" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <div style={{ flex: 1 }}>
              <label>Nombres</label>
              <input
                name="nombres"
                value={form.nombres}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "6px" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Apellidos</label>
              <input
                name="apellidos"
                value={form.apellidos}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "6px" }}
              />
            </div>
          </div>

          <div>
            <label>Cargo</label>
            <input
              name="cargo"
              value={form.cargo}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "6px" }}
            />
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <div style={{ flex: 1 }}>
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                style={{ width: "100%", padding: "6px" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Teléfono</label>
              <input
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                style={{ width: "100%", padding: "6px" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <div style={{ flex: 1 }}>
              <label>Fecha de contratación</label>
              <input
                name="fechaContratacion"
                type="date"
                value={form.fechaContratacion}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "6px" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Salario mensual</label>
              <input
                name="salarioMensual"
                type="number"
                step="0.01"
                value={form.salarioMensual}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "6px" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <input
                id="empleado-activo"
                name="activo"
                type="checkbox"
                checked={form.activo}
                onChange={handleChange}
              />
              <label htmlFor="empleado-activo">Activo</label>
            </div>
          </div>

          <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#0f172a",
                color: "white",
                cursor: "pointer",
              }}
            >
              {isEditing ? "Guardar cambios" : "Crear empleado"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={handleCancelEdit}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#f8fafc",
                  cursor: "pointer",
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      {/* LISTADO */}
      <section
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            marginBottom: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Listado de Empleados</h2>
          {loading && <span style={{ fontSize: "14px" }}>Cargando...</span>}
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr>
                <th>Id</th>
                <th>Documento</th>
                <th>Nombre</th>
                <th>Cargo</th>
                <th>Fecha contr.</th>
                <th>Salario</th>
                <th>Activo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleados.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "12px" }}>
                    No hay empleados registrados
                  </td>
                </tr>
              ) : (
                empleados.map((e) => (
                  <tr key={e.empleadoId}>
                    <td>{e.empleadoId}</td>
                    <td>
                      {e.tipoDocumento} {e.numeroDocumento}
                    </td>
                    <td>
                      {e.nombres} {e.apellidos}
                    </td>
                    <td>{e.cargo}</td>
                    <td>{e.fechaContratacion.substring(0, 10)}</td>
                    <td>{e.salarioMensual.toFixed(2)}</td>
                    <td>{e.activo ? "Sí" : "No"}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleEdit(e)}
                        style={{
                          marginRight: "4px",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          border: "1px solid #e2e8f0",
                          backgroundColor: "#f1f5f9",
                          cursor: "pointer",
                        }}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(e.empleadoId)}
                        style={{
                          padding: "4px 8px",
                          borderRadius: "6px",
                          border: "none",
                          backgroundColor: "#ef4444",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default EmpleadosPage;
