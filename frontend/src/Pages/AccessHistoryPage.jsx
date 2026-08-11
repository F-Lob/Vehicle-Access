import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccessHistoryTable from "../components/AccessHistoryTable.jsx";
import AccessRecordFilters from "../components/AccessRecordFilters.jsx";
import NavbarGuard from "../components/NavbarGuard.jsx";
import { getAccessRecords } from "../services/accessRecord.service.js";
import "../styles/AccessRecords.css";

const emptyFilters = { plate: "", personName: "", date: "", status: "" };
const emptyPagination = { page: 1, limit: 25, total: 0, totalPages: 0 };

const AccessHistoryPage = () => {
  const [filters, setFilters] = useState(emptyFilters);
  const [records, setRecords] = useState([]);
  const [pagination, setPagination] = useState(emptyPagination);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRecords = useCallback(async (currentFilters, page = 1) => {
    setIsLoading(true);
    setError("");
    try {
      const result = await getAccessRecords({ ...currentFilters, page, limit: 25 });
      setRecords(result.records);
      setPagination(result.pagination);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "No fue posible cargar el historial.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecords(emptyFilters);
  }, [loadRecords]); // El historial inicia sin filtros.

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

  return (
    <>
      <NavbarGuard />
      <main className="access-page">
        <div className="access-page__heading">
          <div>
            <h1>Historial de accesos</h1>
            <p>Consulta movimientos abiertos y finalizados por fecha, nombre o patente.</p>
          </div>
          <Link to="/access-records/active">Ver movimientos activos</Link>
        </div>
        <AccessRecordFilters filters={filters} onChange={handleChange} onSubmit={handleSearch} onClear={handleClear} />
        {error && <p className="access-message access-message--error">{error}</p>}
        {isLoading ? (
          <p className="access-message">Cargando historial...</p>
        ) : (
          <AccessHistoryTable records={records} pagination={pagination} onPageChange={(page) => loadRecords(filters, page)} />
        )}
      </main>
    </>
  );
};

export default AccessHistoryPage;
