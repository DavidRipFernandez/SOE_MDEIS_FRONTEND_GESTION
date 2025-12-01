import React, { useEffect, useState } from "react";
import { productoService } from "../services/productoService";
import type { Producto, ProductoCreate } from "../types/models";

type ProductoFormState = {
  codigo: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precioUnitario: string;
  stockActual: string;
  activo: boolean;
};

const emptyForm: ProductoFormState = {
  codigo: "",
  nombre: "",
  descripcion: "",
  categoria: "",
  precioUnitario: "",
  stockActual: "",
  activo: true,
};

const ProductosPage: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [form, setForm] = useState<ProductoFormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = editingId !== null;

  const loadProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productoService.getAll();
      setProductos(data);
    } catch (err: any) {
      setError(err.message ?? "Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProductos();
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

    const dto: ProductoCreate = {
      codigo: form.codigo,
      nombre: form.nombre,
      descripcion: form.descripcion || undefined,
      categoria: form.categoria || undefined,
      precioUnitario: Number(form.precioUnitario),
      stockActual: Number(form.stockActual),
      activo: form.activo,
    };

    try {
      setLoading(true);
      setError(null);

      if (isEditing && editingId !== null) {
        await productoService.update(editingId, dto);
      } else {
        await productoService.create(dto);
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadProductos();
    } catch (err: any) {
      setError(err.message ?? "Error al guardar el producto");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (producto: Producto) => {
    setEditingId(producto.productoId);
    setForm({
      codigo: producto.codigo,
      nombre: producto.nombre,
      descripcion: producto.descripcion ?? "",
      categoria: producto.categoria ?? "",
      precioUnitario: String(producto.precioUnitario),
      stockActual: String(producto.stockActual),
      activo: producto.activo,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      setLoading(true);
      setError(null);
      await productoService.remove(id);
      await loadProductos();
    } catch (err: any) {
      setError(err.message ?? "Error al eliminar el producto");
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
          {isEditing ? "Editar Producto" : "Nuevo Producto"}
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
              <label>Código</label>
              <input
                name="codigo"
                value={form.codigo}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "6px" }}
              />
            </div>
            <div style={{ flex: 2 }}>
              <label>Nombre</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "6px" }}
              />
            </div>
          </div>

          <div>
            <label>Descripción</label>
            <input
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              style={{ width: "100%", padding: "6px" }}
            />
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <div style={{ flex: 1 }}>
              <label>Categoría</label>
              <input
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                style={{ width: "100%", padding: "6px" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Precio unitario</label>
              <input
                name="precioUnitario"
                type="number"
                step="0.01"
                value={form.precioUnitario}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "6px" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <label>Stock actual</label>
              <input
                name="stockActual"
                type="number"
                value={form.stockActual}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "6px" }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <input
                id="activo"
                name="activo"
                type="checkbox"
                checked={form.activo}
                onChange={handleChange}
              />
              <label htmlFor="activo">Activo</label>
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
              {isEditing ? "Guardar cambios" : "Crear producto"}
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
          <h2>Listado de Productos</h2>
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
                <th>Código</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Activo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "12px" }}>
                    No hay productos registrados
                  </td>
                </tr>
              ) : (
                productos.map((p) => (
                  <tr key={p.productoId}>
                    <td>{p.productoId}</td>
                    <td>{p.codigo}</td>
                    <td>{p.nombre}</td>
                    <td>{p.categoria}</td>
                    <td>{p.precioUnitario.toFixed(2)}</td>
                    <td>{p.stockActual}</td>
                    <td>{p.activo ? "Sí" : "No"}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleEdit(p)}
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
                        onClick={() => handleDelete(p.productoId)}
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

export default ProductosPage;
