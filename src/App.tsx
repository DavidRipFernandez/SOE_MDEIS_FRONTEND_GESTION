import { NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ClientesPage from "./pages/ClientesPage";   // 👈 AQUÍ

function PlaceholderPage({ titulo }: { titulo: string }) {
  return (
    <div style={{ padding: "24px" }}>
      <h1>{titulo}</h1>
      <p>Próximamente aquí estará el CRUD completo.</p>
    </div>
  );
}

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
      }}
    >
      <header
        style={{
          background: "#0f172a",
          color: "white",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontWeight: 600 }}>SOE MDEIS - Gestión</div>
        <nav style={{ display: "flex", gap: "16px" }}>
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({
              color: isActive ? "#38bdf8" : "white",
              textDecoration: "none",
              fontWeight: isActive ? 600 : 400,
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/clientes"
            style={({ isActive }) => ({
              color: isActive ? "#38bdf8" : "white",
              textDecoration: "none",
              fontWeight: isActive ? 600 : 400,
            })}
          >
            Clientes
          </NavLink>
          <NavLink
            to="/productos"
            style={({ isActive }) => ({
              color: isActive ? "#38bdf8" : "white",
              textDecoration: "none",
              fontWeight: isActive ? 600 : 400,
            })}
          >
            Productos
          </NavLink>
          <NavLink
            to="/empleados"
            style={({ isActive }) => ({
              color: isActive ? "#38bdf8" : "white",
              textDecoration: "none",
              fontWeight: isActive ? 600 : 400,
            })}
          >
            Empleados
          </NavLink>
        </nav>
      </header>

      <main style={{ padding: "24px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clientes" element={<ClientesPage />} />  {/* 👈 AQUÍ usamos la página */}
          <Route
            path="/productos"
            element={<PlaceholderPage titulo="Gestión de Productos" />}
          />
          <Route
            path="/empleados"
            element={<PlaceholderPage titulo="Gestión de Empleados" />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
