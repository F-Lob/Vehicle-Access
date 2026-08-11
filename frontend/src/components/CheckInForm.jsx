import { useState } from "react";
import { checkIn } from "../services/accessRecord.service.js";

const initialForm = {
  plate: "",
  personName: "",
  personDocument: "",
  visitorType: "visitor",
  purpose: "",
  notes: "",
};

function getErrorMessage(error) {
  return error.response?.data?.message || "No fue posible registrar el ingreso.";
}

const CheckInForm = ({ onCreated }) => {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const record = await checkIn(form);
      setForm(initialForm);
      onCreated?.(record);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="access-form" onSubmit={handleSubmit}>
      <div className="access-form__grid">
        <label>
          Patente *
          <input name="plate" value={form.plate} onChange={handleChange} placeholder="ABCD12" required />
        </label>
        <label>
          Nombre completo *
          <input name="personName" value={form.personName} onChange={handleChange} required />
        </label>
        <label>
          Documento
          <input name="personDocument" value={form.personDocument} onChange={handleChange} placeholder="RUT, DNI u otro" />
        </label>
        <label>
          Tipo de acceso
          <select name="visitorType" value={form.visitorType} onChange={handleChange}>
            <option value="visitor">Visita</option>
            <option value="resident">Residente</option>
            <option value="provider">Proveedor</option>
            <option value="employee">Trabajador</option>
            <option value="other">Otro</option>
          </select>
        </label>
        <label>
          Motivo
          <input name="purpose" value={form.purpose} onChange={handleChange} placeholder="Ej.: visita, entrega, mantenimiento" />
        </label>
        <label>
          Observaciones
          <input name="notes" value={form.notes} onChange={handleChange} />
        </label>
      </div>
      {error && <p className="access-message access-message--error">{error}</p>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registrando..." : "Registrar ingreso"}
      </button>
    </form>
  );
};

export default CheckInForm;
