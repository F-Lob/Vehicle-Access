import api from "./root.service.js";

const RESOURCE = "/access-records";

function authConfig(config = {}) {
  const token = sessionStorage.getItem("token");
  return {
    ...config,
    headers: {
      ...config.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
}

export async function checkIn(payload) {
  const { data } = await api.post(`${RESOURCE}/check-in`, payload, authConfig());
  return data.data;
}

export async function checkOut(recordId) {
  const { data } = await api.post(`${RESOURCE}/${recordId}/check-out`, {}, authConfig());
  return data.data;
}

export async function getAccessRecords(filters = {}) {
  const params = Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== "" && value !== undefined && value !== null),
  );
  const { data } = await api.get(RESOURCE, authConfig({ params }));
  return data.data;
}

export async function getAccessRecordById(recordId) {
  const { data } = await api.get(`${RESOURCE}/${recordId}`, authConfig());
  return data.data;
}
