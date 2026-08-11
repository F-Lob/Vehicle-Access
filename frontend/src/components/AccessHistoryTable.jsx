const formatDate = (value) => (value ? new Date(value).toLocaleString() : "—");

const AccessHistoryTable = ({ records, pagination, onPageChange }) => (
  <>
    {records.length === 0 ? (
      <p className="access-message">No se encontraron movimientos con los filtros indicados.</p>
    ) : (
      <div className="access-table-wrapper">
        <table className="access-table">
          <thead>
            <tr>
              <th>Patente</th>
              <th>Persona</th>
              <th>Tipo</th>
              <th>Entrada</th>
              <th>Salida</th>
              <th>Estado</th>
              <th>Operador</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record._id}>
                <td>{record.plate}</td>
                <td>{record.personName}</td>
                <td>{record.visitorType}</td>
                <td>{formatDate(record.entryAt)}</td>
                <td>{formatDate(record.exitAt)}</td>
                <td>{record.status === "inside" ? "Dentro" : "Finalizado"}</td>
                <td>{record.registeredBy?.username || "No disponible"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    {pagination.totalPages > 1 && (
      <div className="access-pagination">
        <button type="button" disabled={pagination.page === 1} onClick={() => onPageChange(pagination.page - 1)}>
          Anterior
        </button>
        <span>Pagina {pagination.page} de {pagination.totalPages}</span>
        <button type="button" disabled={pagination.page === pagination.totalPages} onClick={() => onPageChange(pagination.page + 1)}>
          Siguiente
        </button>
      </div>
    )}
  </>
);

export default AccessHistoryTable;
