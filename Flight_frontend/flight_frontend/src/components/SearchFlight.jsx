import { useState } from "react";
import { FlightService } from "../services/FlightService";

const MODES = [
  { id: "code",    label: "By Code"    },
  { id: "carrier", label: "By Carrier" },
  { id: "route",   label: "By Route"   },
  { id: "price",   label: "By Price"   },
];

function FlightTable({ rows }) {
  return (
    <div className="table-wrap">
      <table className="flight-table">
        <thead>
          <tr>
            <th>Code</th><th>Carrier</th><th>Source</th><th>Destination</th><th>Cost (₹)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((f) => (
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
  );
}

export default function SearchFlight() {
  const [mode, setMode]     = useState("code");
  const [p, setP]           = useState({ code: "", carrier: "", source: "", destination: "", min: "", max: "" });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  const set = (k, v) => setP((prev) => ({ ...prev, [k]: v }));
  const reset = () => { setResults(null); setError(""); };

  const search = async () => {
    setLoading(true);
    setError("");
    setResults(null);
    try {
      let data;
      if (mode === "code")    data = await FlightService.getByCode(p.code);
      if (mode === "carrier") data = await FlightService.getByCarrier(p.carrier);
      if (mode === "route")   data = await FlightService.getByRoute(p.source, p.destination);
      if (mode === "price")   data = await FlightService.getByPriceRange(p.min, p.max);
      setResults(Array.isArray(data) ? data : [data]);
    } catch {
      setError("No results found.");
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Search Flights</h1>
        <p className="page-sub">Search by code, carrier, route, or cost range.</p>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="tabs">
          {MODES.map((m) => (
            <button
              key={m.id}
              className={`tab${mode === m.id ? " active" : ""}`}
              onClick={() => { setMode(m.id); reset(); }}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="search-fields">
          {mode === "code" && (
            <div className="form-group">
              <label className="form-label">Flight Code</label>
              <input className="form-input" type="number" value={p.code}
                onChange={(e) => set("code", e.target.value)} placeholder="e.g. 101" />
            </div>
          )}
          {mode === "carrier" && (
            <div className="form-group">
              <label className="form-label">Carrier Name</label>
              <input className="form-input" type="text" value={p.carrier}
                onChange={(e) => set("carrier", e.target.value)} placeholder="e.g. IndiGo" />
            </div>
          )}
          {mode === "route" && (
            <>
              <div className="form-group">
                <label className="form-label">Source</label>
                <input className="form-input" type="text" value={p.source}
                  onChange={(e) => set("source", e.target.value)} placeholder="e.g. Mumbai" />
              </div>
              <div className="form-group">
                <label className="form-label">Destination</label>
                <input className="form-input" type="text" value={p.destination}
                  onChange={(e) => set("destination", e.target.value)} placeholder="e.g. Delhi" />
              </div>
            </>
          )}
          {mode === "price" && (
            <>
              <div className="form-group">
                <label className="form-label">Min Cost (₹)</label>
                <input className="form-input" type="number" value={p.min}
                  onChange={(e) => set("min", e.target.value)} placeholder="e.g. 1000" />
              </div>
              <div className="form-group">
                <label className="form-label">Max Cost (₹)</label>
                <input className="form-input" type="number" value={p.max}
                  onChange={(e) => set("max", e.target.value)} placeholder="e.g. 8000" />
              </div>
            </>
          )}
          <button className="btn btn-primary" onClick={search} disabled={loading}
            style={{ alignSelf: "flex-end", flexShrink: 0 }}>
            {loading ? "Searching…" : "Search"}
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
      </div>

      {results && results.length === 0 && (
        <div className="state-msg">No flights matched your query.</div>
      )}
      {results && results.length > 0 && (
        <>
          <p className="results-label">{results.length} result{results.length !== 1 ? "s" : ""}</p>
          <FlightTable rows={results} />
        </>
      )}
    </div>
  );
}