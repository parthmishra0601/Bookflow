import React, { useState } from "react";
import { MapPin, Calendar, ArrowRightLeft, Bus } from "lucide-react";

export default function SearchBuses() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [error, setError] = useState("");

  const handleSwap = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!fromCity || !toCity || !travelDate) {
      setError("Please select From, To and Date to search buses.");
      return;
    }

    setError("");
    alert(`Searching buses from ${fromCity} to ${toCity} on ${travelDate}`);

    // Later: navigate(`/buses?from=${fromCity}&to=${toCity}&date=${travelDate}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-7">
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-[1.5fr_1.5fr_1fr_auto] gap-4 items-end"
      >
        <div>
          <label className="flex items-center gap-1 text-xs font-medium text-slate-600 mb-1.5">
            <MapPin size={14} />
            From
          </label>
          <input
            type="text"
            placeholder="Enter departure city"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="flex items-center gap-1 text-xs font-medium text-slate-600 mb-1.5">
            <MapPin size={14} />
            To
          </label>
          <input
            type="text"
            placeholder="Enter destination city"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="flex items-center gap-1 text-xs font-medium text-slate-600 mb-1.5">
            <Calendar size={14} />
            Date
          </label>
          <input
            type="date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-2 md:flex-col">
          <button
            type="button"
            onClick={handleSwap}
            className="flex-1 md:flex-none inline-flex items-center justify-center 
              gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 
              hover:bg-slate-50 transition"
          >
            <ArrowRightLeft size={14} />
            <span>Swap</span>
          </button>

          <button
            type="submit"
            className="flex-1 md:flex-none inline-flex items-center justify-center 
              rounded-xl bg-indigo-600 text-white text-sm font-semibold px-4 py-2.5 
              hover:bg-indigo-700 shadow-sm transition"
          >
            <Bus size={16} className="mr-1.5" />
            Search Buses
          </button>
        </div>
      </form>

      {error && (
        <p className="mt-3 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
    </div>
  );
}
