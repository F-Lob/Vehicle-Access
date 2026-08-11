import { useState } from "react";
import { Link } from "react-router-dom";
import CheckInForm from "../components/CheckInForm.jsx";
import NavbarGuard from "../components/NavbarGuard.jsx";
import "../styles/AccessRecords.css";

const AccessControlPage = () => {
  const [lastRecord, setLastRecord] = useState(null);

  return (
    <>
      <NavbarGuard />
      <main className="access-page">
        <div className="access-page__heading">
          <div>
            <h1>Control de acceso</h1>
            <p>Registra el ingreso de personas y vehiculos al recinto.</p>
          </div>
          <Link to="/access-records/active">Ver movimientos activos</Link>
        </div>
        <CheckInForm onCreated={setLastRecord} />
        {lastRecord && (
          <p className="access-message access-message--success">
            Ingreso registrado: {lastRecord.personName} — {lastRecord.plate}.
          </p>
        )}
      </main>
    </>
  );
};

export default AccessControlPage;
