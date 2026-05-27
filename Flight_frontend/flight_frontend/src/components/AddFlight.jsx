import { useState } from "react";
import { FlightService } from "../services/FlightService";

const EMPTY = { code: "", carrier: "", source: "", destination: "", cost: "" };

export default function AddFlight() {
  const [form, setForm]     = useState(EMPTY);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const saved = await FlightService.addFlight({
        code:        parseInt(form.code),
        carrier:     form.carrier,
        source:      form.source,
        destination: form.destination,
        cost:        parseInt(form.cost),
      });
      setStatus({ ok: true, msg: `Flight #${saved.code} (${saved.carrier}: ${saved.source} → ${saved.destination}) added.` });
      setForm(EMPTY);
    } catch {
      setStatus({ ok: false, msg: "Failed to add flight. Check that the server is running." });
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Add Flight</h1>
        <p className="page-sub">Fill in the details below to add a new flight.</p>
      </div>

      <div className="card" style={{ maxWidth: 520 }}>
        <form onSubmit={submit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Flight Code</label>
              <input className="form-input" type="number" name="code" value={form.code}
                onChange={handle} placeholder="e.g. 101" required />
            </div>
            <div className="form-group">
              <label className="form-label">Carrier</label>
              <input className="form-input" type="text" name="carrier" value={form.carrier}
                onChange={handle} placeholder="e.g. IndiGo" required />
            </div>
            <div className="form-group">
              <label className="form-label">Source</label>
              <input className="form-input" type="text" name="source" value={form.source}
                onChange={handle} placeholder="e.g. Mumbai" required />
            </div>
            <div className="form-group">
              <label className="form-label">Destination</label>
              <input className="form-input" type="text" name="destination" value={form.destination}
                onChange={handle} placeholder="e.g. Delhi" required />
            </div>
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label className="form-label">Cost (₹)</label>
              <input className="form-input" type="number" name="cost" value={form.cost}
                onChange={handle} placeholder="e.g. 4500" required />
            </div>
          </div>

          {status && (
            <div className={`alert ${status.ok ? "alert-success" : "alert-error"}`}>
              {status.msg}
            </div>
          )}

          <div style={{ marginTop: 18 }}>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Saving…" : "Add Flight"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}