const formatDate = (value) => (value ? new Date(value).toLocaleString() : "—");

const ActiveAccessRecords = ({ records, onCheckOut, checkingOutId }) => {
  if (records.length === 0) {
    return <p className="access-message">No hay vehiculos ni visitas registrados dentro del recinto.</p>;
  }

  return (
    <div className="access-table-wrapper">
      <table className="access-table">
        <thead>
          <tr>
            <th>Patente</th>
            <th>Persona</th>
            <th>Tipo</th>
            <th>Motivo</th>
            <th>Ingreso</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record._id}>
              <td>{record.plate}</td>
              <td>{record.personName}</td>
              <td>{record.visitorType}</td>
              <td>{record.purpose}</td>
              <td>{formatDate(record.entryAt)}</td>
              <td>
                <button
                  type="button"
                  onClick={() => onCheckOut(record._id)}
                  disabled={checkingOutId === record._id}
                >
                  {checkingOutId === record._id ? "Registrando..." : "Registrar salida"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveAccessRecords;
