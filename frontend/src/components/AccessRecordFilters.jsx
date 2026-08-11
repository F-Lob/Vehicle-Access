const AccessRecordFilters = ({ filters, onChange, onSubmit, onClear, showStatus = true }) => (
  <form className="access-filters" onSubmit={onSubmit}>
    <input
      name="plate"
      value={filters.plate}
      onChange={onChange}
      placeholder="Patente"
    />
    <input
      name="personName"
      value={filters.personName}
      onChange={onChange}
      placeholder="Nombre"
    />
    <input type="date" name="date" value={filters.date} onChange={onChange} />
    {showStatus && (
      <select name="status" value={filters.status} onChange={onChange}>
        <option value="">Todos los estados</option>
        <option value="inside">Dentro</option>
        <option value="closed">Finalizados</option>
      </select>
    )}
    <button type="submit">Buscar</button>
    <button type="button" onClick={onClear}>Limpiar</button>
  </form>
);

export default AccessRecordFilters;
