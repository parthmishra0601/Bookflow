import React, { useEffect, useState } from "react";
import { api } from "../api";
import { Clock, Bus } from "lucide-react";

export default function AvailableBuses({ onViewSeats }) {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get("/shows");
        setShows(res.data);
      } catch (e) {
        setError("Failed to load buses.");
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 shadow-md mt-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <Bus size={20} className="text-indigo-600" />
        Available Buses
      </h2>

      {loading && <p className="text-sm text-slate-500">Loading...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && shows.length === 0 && (
        <p className="text-sm text-slate-600">No buses found.</p>
      )}

      <div className="space-y-4">
        {shows.map((s) => (
          <div
            key={s.id}
            className="border border-slate-200 rounded-xl p-5 bg-slate-50 hover:shadow-lg transition flex items-center justify-between"
          >
            <div>
              <p className="text-base font-semibold text-slate-900">{s.bus_name}</p>
              <p className="flex items-center gap-2 mt-2 text-xs text-slate-600">
                <Clock size={14} className="text-indigo-600" />
                {new Date(s.start_time).toLocaleString()}
              </p>
              <p className="mt-2 text-sm text-slate-800">
                Total Seats: <span className="font-semibold">{s.total_seats}</span>
              </p>
            </div>

            <button
              onClick={() => onViewSeats?.(s.id)}
              className="px-4 py-2 text-xs rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              View Seats
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
