import { useEffect, useState } from "react";
import { FlightService } from "../services/FlightService";

export default function FlightList() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    FlightService.getAllFlights()
      .then((data) => { setFlights(data); setLoading(false); })
      .catch(() => { setError("Could not connect to server."); setLoading(false); });
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">
          All Flights
          {!loading && !error && (
            <span className="count-badge">{flights.length}</span>
          )}
        </h1>
        <p className="page-sub">Showing all flights currently in the database.</p>
      </div>

      {loading && <div className="state-msg">Loading…</div>}
      {error   && <div className="state-msg error">{error}</div>}
      {!loading && !error && flights.length === 0 && (
        <div className="state-msg">No flights found.</div>
      )}

      {!loading && !error && flights.length > 0 && (
        <div className="table-wrap">
          <table className="flight-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Carrier</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Cost (₹)</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((f) => (
                <tr key={f.code}>
                  <td><span className="code-tag">{f.code}</span></td>
                  <td><span className="carrier-tag">{f.carrier}</span></td>
                  <td>{f.source}</td>
                  <td>{f.destination}</td>
                  <td><span className="cost-val">₹{f.cost.toLocaleString("en-IN")}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}