import { useState } from "react";
import { FlightService } from "../services/FlightService";

export default function DeleteFlight() {
  const [code, setCode]     = useState("");
  const [confirm, setConfirm] = useState(false);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const msg = await FlightService.deleteFlight(code);
      setStatus({ ok: true, msg: msg || "Flight deleted." });
      setCode("");
    } catch {
      setStatus({ ok: false, msg: "Delete failed. Flight may not exist." });
    }
    setLoading(false);
    setConfirm(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Delete Flight</h1>
        <p className="page-sub">Enter a flight code to remove it from the database.</p>
      </div>

      <div className="card" style={{ maxWidth: 420 }}>
        <div className="form-group" style={{ marginBottom: 16 }}>
          <label className="form-label">Flight Code</label>
          <input
            className="form-input"
            type="number"
            value={code}
            onChange={(e) => { setCode(e.target.value); setConfirm(false); setStatus(null); }}
            placeholder="e.g. 101"
          />
        </div>

        {!confirm ? (
          <button
            className="btn btn-danger"
            disabled={!code}
            onClick={() => setConfirm(true)}
          >
            Delete Flight
          </button>
        ) : (
          <div className="confirm-box">
            <p>Delete flight <strong>#{code}</strong>? This action cannot be undone.</p>
            <div className="confirm-actions">
              <button className="btn btn-danger" onClick={handleDelete} disabled={loading}>
                {loading ? "Deleting…" : "Yes, Delete"}
              </button>
              <button className="btn btn-ghost" onClick={() => setConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {status && (
          <div className={`alert ${status.ok ? "alert-success" : "alert-error"}`}>
            {status.msg}
          </div>
        )}
      </div>
    </div>
  );
}