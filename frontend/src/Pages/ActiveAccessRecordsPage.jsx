import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActiveAccessRecords from "../components/ActiveAccessRecords.jsx";
import AccessRecordFilters from "../components/AccessRecordFilters.jsx";
import NavbarGuard from "../components/NavbarGuard.jsx";
import { checkOut, getAccessRecords } from "../services/accessRecord.service.js";
import "../styles/AccessRecords.css";

const emptyFilters = { plate: "", personName: "", date: "", status: "inside" };

function getErrorMessage(error) {
  return error.response?.data?.message || "No fue posible cargar los movimientos.";
}

const ActiveAccessRecordsPage = () => {
  const [filters, setFilters] = useState(emptyFilters);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkingOutId, setCheckingOutId] = useState("");
  const [error, setError] = useState("");

  const loadRecords = useCallback(async (currentFilters) => {
    setIsLoading(true);
    setError("");
    try {
      const result = await getAccessRecords({ ...currentFilters, limit: 100 });
      setRecords(result.records);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecords(emptyFilters);
  }, [loadRecords]); // La carga inicial siempre muestra solo movimientos abiertos.

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    loadRecords(filters);
  };

  const handleClear = () => {
    setFilters(emptyFilters);
    loadRecords(emptyFilters);
  };

  const handleCheckOut = async (recordId) => {
    setCheckingOutId(recordId);
    setError("");
    try {
      await checkOut(recordId);
      await loadRecords(filters);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setCheckingOutId("");
    }
  };

  return (
    <>
      <NavbarGuard />
      <main className="access-page">
        <div className="access-page__heading">
          <div>
            <h1>Movimientos activos</h1>
            <p>Personas y vehiculos que actualmente se encuentran dentro.</p>
          </div>
          <Link to="/access-control">Registrar ingreso</Link>
        </div>
        <AccessRecordFilters
          filters={filters}
          onChange={handleChange}
          onSubmit={handleSearch}
          onClear={handleClear}
          showStatus={false}
        />
        {error && <p className="access-message access-message--error">{error}</p>}
        {isLoading ? (
          <p className="access-message">Cargando movimientos...</p>
        ) : (
          <ActiveAccessRecords records={records} onCheckOut={handleCheckOut} checkingOutId={checkingOutId} />
        )}
      </main>
    </>
  );
};

export default ActiveAccessRecordsPage;
