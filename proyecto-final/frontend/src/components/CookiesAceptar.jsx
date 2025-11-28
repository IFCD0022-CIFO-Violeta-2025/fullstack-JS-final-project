import { useState } from "react";

const CookieConsent = () => {

  const [accepted, setAccepted] = useState(() => {
    return localStorage.getItem("cookieConsent") === "true";
  });

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(10px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            color: "#000",
            padding: "3rem",
            borderRadius: "15px",
            textAlign: "center",
            maxWidth: "600px",
            width: "90%",
            boxShadow: "0 0 25px rgba(0,0,0,0.5)",
            zIndex: 10000,
            fontFamily: "'Arial', sans-serif",
          }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>
            Para el correcto funcionamiento de esta web, necesitamos que apruebes el uso de cookies.
          </h2>

          <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
           Nuestra web utiliza únicamente cookies técnicas, esenciales para el correcto funcionamiento del sitio.
          Estas cookies permiten, por ejemplo, recordar tu inicio de sesión y mantener tus preferencias de navegación.
          </p>

          <p style={{ fontSize: "1rem", marginTop: "1rem" }}>
            Si deseas más información sobre cómo gestionamos tus datos, consulta nuestra{" "}
            <a
              href="/2025-11-20 Armand Events - Normativa, Política Privacidad, Cookies.pdf"
              target="_blank"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              Política de Privacidad
            </a>
          </p>

          <button
            onClick={handleAccept}
            style={{
              marginTop: "2rem",
              padding: "0.75rem 2rem",
              fontSize: "1.2rem",
              cursor: "pointer",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "rgba(135, 100, 199, 1)",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Aceptar Cookies
          </button>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
