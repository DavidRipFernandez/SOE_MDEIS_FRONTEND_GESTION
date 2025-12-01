import React from "react";

const integrantes = [
  "Oliver Carrazans",
  "Julio Cesar",
  "Jose David Ripalda",
  "Jose Reinaldo",
  "Juan Pablo",
];

const HomePage: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        background: "white",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          textAlign: "center",
          marginBottom: "24px",
          letterSpacing: "0.04em",
        }}
      >
        MAESTRÍA EN DIRECCIÓN ESTRATÉGICA
        <br />
        EN INGENIERÍA DE SOFTWARE
      </h1>

      <h2
        style={{
          fontSize: "18px",
          marginBottom: "12px",
          textAlign: "center",
          fontWeight: 600,
        }}
      >
        Integrantes
      </h2>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "center",
        }}
      >
        {integrantes.map((nombre) => (
          <li
            key={nombre}
            style={{
              padding: "8px 16px",
              borderRadius: "999px",
              border: "1px solid #e2e8f0",
              minWidth: "260px",
              textAlign: "center",
            }}
          >
            {nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
