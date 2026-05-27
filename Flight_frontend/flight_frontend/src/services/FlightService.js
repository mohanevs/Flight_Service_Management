const BASE_URL = "http://localhost:8081/api/v5/flights";

export const FlightService = {
  addFlight: (flight) =>
    fetch(`${BASE_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flight),
    }).then((r) => {
      if (!r.ok) throw new Error("Failed");
      return r.json();
    }),

  getAllFlights: () =>
    fetch(`${BASE_URL}/all`).then((r) => {
      if (!r.ok) throw new Error("Failed");
      return r.json();
    }),

  getByCode: (code) =>
    fetch(`${BASE_URL}/${code}`).then((r) => {
      if (!r.ok) throw new Error("Not found");
      return r.json();
    }),

  getByCarrier: (carrier) =>
    fetch(`${BASE_URL}/carrier/${carrier}`).then((r) => {
      if (!r.ok) throw new Error("Not found");
      return r.json();
    }),

  getByRoute: (source, destination) =>
    fetch(`${BASE_URL}/route?source=${source}&destination=${destination}`).then((r) => {
      if (!r.ok) throw new Error("Not found");
      return r.json();
    }),

  getByPriceRange: (min, max) =>
    fetch(`${BASE_URL}/price?min=${min}&max=${max}`).then((r) => {
      if (!r.ok) throw new Error("Not found");
      return r.json();
    }),

  deleteFlight: (code) =>
    fetch(`${BASE_URL}/${code}`, { method: "DELETE" }).then((r) => r.text()),
};