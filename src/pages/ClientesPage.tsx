import React, { useEffect, useState } from "react";
import { clienteService } from "../services/clienteService";
import type { Cliente, ClienteCreate } from "../types/models";

const emptyForm: ClienteCreate = {
  tipoDocumento: "",
  numeroDocumento: "",
  nombres: "",
  apellidos: "",
  email: "",
  telefono: "",
  direccion: "",
};

const ClientesPage: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<ClienteCreate>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const isEditing = editingId !== null;

  const loadClientes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await clienteService.getAll();
      setClientes(data);
    } catch (err: any) {
      setError(err.message ?? "Error al obtener clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadClientes();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      if (isEditing && editingId !== null) {
        await clienteService.update(editingId, form);
      } else {
        await clienteService.create(form);
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadClientes();
    } catch (err: any) {
      setError(err.message ?? "Error al guardar el cliente");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cliente: Cliente) => {
    setEditingId(cliente.clienteId);
    setForm({
      tipoDocumento: cliente.tipoDocumento,
      numeroDocumento: cliente.numeroDocumento,
      nombres: cliente.nombres,
      apellidos: cliente.apellidos,
      email: cliente.email ?? "",
      telefono: cliente.telefono ?? "",
      direccion: cliente.direccion ?? "",
      activo: cliente.activo,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este cliente?")) return;
    try {
      setLoading(true);
      setError(null);
      await clienteService.remove(id);
      await loadClientes();
    } catch (err: any) {
      setError(err.message ?? "Error al eliminar el cliente");
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
          {isEditing ? "Editar Cliente" : "Nuevo Cliente"}
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

          <div>
            <label>Dirección</label>
            <input
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              style={{ width: "100%", padding: "6px" }}
            />
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
              {isEditing ? "Guardar cambios" : "Crear cliente"}
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
          <h2>Listado de Clientes</h2>
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
                <th>Email</th>
                <th>Teléfono</th>
                <th>Activo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "12px" }}>
                    No hay clientes registrados
                  </td>
                </tr>
              ) : (
                clientes.map((c) => (
                  <tr key={c.clienteId}>
                    <td>{c.clienteId}</td>
                    <td>
                      {c.tipoDocumento} {c.numeroDocumento}
                    </td>
                    <td>
                      {c.nombres} {c.apellidos}
                    </td>
                    <td>{c.email}</td>
                    <td>{c.telefono}</td>
                    <td>{c.activo ? "Sí" : "No"}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleEdit(c)}
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
                        onClick={() => handleDelete(c.clienteId)}
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

export default ClientesPage;
