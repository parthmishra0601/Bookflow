import React, { useEffect, useState } from "react";
import { api } from "../api";
import { Ticket, Clock } from "lucide-react";

export default function MyBookings({ userId = 1 }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get(`/bookings/${userId}`);
        setBookings(res.data);
      } catch (e) {
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 shadow-md mt-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-5 flex items-center gap-2">
        <Ticket size={22} className="text-indigo-600" />
        My Bookings
      </h2>

      {loading && <p className="text-sm text-slate-500">Loading...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <p className="text-sm text-slate-600 text-center py-10">
          You have no bookings yet.
        </p>
      )}

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b.booking_id}
            className="border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition bg-slate-50"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-slate-900">{b.bus_name}</p>
                <p className="text-xs text-slate-600 flex items-center gap-2 mt-1">
                  <Clock size={14} className="text-indigo-600" />
                  {new Date(b.start_time).toLocaleString()}
                </p>
              </div>

              <span className="px-3 py-1 text-xs rounded-lg bg-indigo-100 text-indigo-700 font-medium">
                {b.status}
              </span>
            </div>

            <div className="mt-4 text-sm text-slate-800">
              Seats: <span className="font-semibold">{(b.seats || []).join(", ")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
