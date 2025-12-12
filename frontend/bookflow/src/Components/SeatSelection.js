import React, { useEffect, useMemo, useState } from "react";
import { api } from "../api";

export default function SeatSelection({ showId, userId = 1, onBooked }) {
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookingMsg, setBookingMsg] = useState("");

  useEffect(() => {
    if (!showId) return;

    const fetchSeats = async () => {
      try {
        setLoading(true);
        setError("");
        setBookingMsg("");
        const res = await api.get(`/shows/${showId}/seats`);
        setSeats(res.data);
        setSelected(new Set());
      } catch (e) {
        setError("Failed to load seats.");
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [showId]);

  const selectedIds = useMemo(() => Array.from(selected), [selected]);

  const toggleSeat = (seat) => {
    if (seat.is_booked) return;

    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(seat.id)) next.delete(seat.id);
      else next.add(seat.id);
      return next;
    });
  };

  const confirmBooking = async () => {
    if (selectedIds.length === 0) {
      setBookingMsg("Select at least 1 seat.");
      return;
    }

    try {
      setLoading(true);
      setBookingMsg("");
      await api.post("/bookings", {
        user_id: userId,
        show_id: showId,
        seat_ids: selectedIds,
      });
      setBookingMsg("Booking created!");
      onBooked?.();
    } catch (e) {
      setBookingMsg("Booking failed (seat may already be taken).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 shadow-md mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Select Seats</h2>
        <p className="text-xs text-slate-500">Show ID: {showId}</p>
      </div>

      {loading && <p className="text-sm text-slate-500">Loading...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
            {seats.map((seat) => {
              const isSelected = selected.has(seat.id);

              return (
                <button
                  key={seat.id}
                  onClick={() => toggleSeat(seat)}
                  disabled={seat.is_booked}
                  className={`h-10 rounded-lg text-xs font-semibold border transition
                    ${
                      seat.is_booked
                        ? "bg-slate-200 text-slate-500 border-slate-200 cursor-not-allowed"
                        : isSelected
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-slate-800 border-slate-300 hover:border-indigo-400"
                    }`}
                >
                  {seat.seat_number}
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="text-sm text-slate-700">
              Selected:{" "}
              <span className="font-semibold">
                {selectedIds.length ? selectedIds.length : 0}
              </span>
            </div>

            <button
              onClick={confirmBooking}
              disabled={loading}
              className="px-4 py-2 text-xs rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:bg-indigo-300"
            >
              Confirm Booking
            </button>
          </div>

          {bookingMsg && (
            <p className="mt-3 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
              {bookingMsg}
            </p>
          )}
        </>
      )}
    </div>
  );
}
