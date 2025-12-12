import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const AdminPage = () => {
  const [shows, setShows] = useState([]);
  const [busName, setBusName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [travelDate, setTravelDate] = useState("");

  const [filteredShows, setFilteredShows] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchShows = async () => {
    try {
      setError(null);
      const res = await axios.get(`${API_BASE}/shows`);
      setShows(res.data);

      if (!isSearching) {
        setFilteredShows(res.data);
      }
    } catch (err) {
      console.error("Error fetching shows:", err);
      setError("Failed to load shows");
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  const handleCreateShow = async (e) => {
    e.preventDefault();

    if (!busName || !startTime || !totalSeats) {
      alert("All fields are required");
      return;
    }

    const seatsNum = Number(totalSeats);
    if (isNaN(seatsNum) || seatsNum <= 0) {
      alert("Total seats must be a positive number");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${API_BASE}/shows`, {
        bus_name: busName,
        start_time: startTime,
        total_seats: seatsNum,
      });

      const newShow = res.data;

      const updatedShows = [newShow, ...shows];
      setShows(updatedShows);

      if (!isSearching) {
        setFilteredShows(updatedShows);
      }

      setBusName("");
      setStartTime("");
      setTotalSeats("");
    } catch (err) {
      console.error("Error creating show:", err);
      setError("Failed to create show");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!fromCity || !toCity || !travelDate) {
      alert("Please select from, to and date");
      return;
    }

    setIsSearching(true);

    const filtered = shows.filter((show) => {
      const nameLower = show.bus_name.toLowerCase();

      const fromMatch = nameLower.includes(fromCity.toLowerCase());
      const toMatch = nameLower.includes(toCity.toLowerCase());

      const showDate = new Date(show.start_time).toISOString().slice(0, 10);
      const dateMatch = showDate === travelDate;

      return fromMatch && toMatch && dateMatch;
    });

    setFilteredShows(filtered);
  };

  const handleReset = () => {
    setFromCity("");
    setToCity("");
    setTravelDate("");

    setIsSearching(false);
    setFilteredShows(shows);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin / Bus Management</h1>

      <div className="bg-white shadow p-6 rounded-lg mb-10">
        <h2 className="text-xl font-semibold mb-4">Create New Bus Trip</h2>

        <form onSubmit={handleCreateShow} className="space-y-4">
          <input
            type="text"
            placeholder="Bus Name (e.g. Mumbai - Pune Shivneri Express)"
            value={busName}
            onChange={(e) => setBusName(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Total Seats"
            value={totalSeats}
            onChange={(e) => setTotalSeats(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Creating..." : "Create Bus Trip"}
          </button>
        </form>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>

      <div className="bg-white shadow p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Search Buses</h2>

        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
        >
          <div>
            <label className="block text-sm mb-1">From</label>
            <input
              type="text"
              placeholder="e.g. Mumbai"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">To</label>
            <input
              type="text"
              placeholder="e.g. Pune"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Date</label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="md:col-span-3 flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              Search Buses
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="flex-1 bg-slate-200 text-slate-800 p-2 rounded hover:bg-slate-300"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          {isSearching ? "Search Results" : "All Available Buses"}
        </h2>

        {filteredShows.length === 0 ? (
          <p className="text-gray-600 text-sm">
            {isSearching ? "No buses found for this search." : "No buses added yet."}
          </p>
        ) : (
          <div className="space-y-3">
            {filteredShows.map((show) => (
              <div
                key={show.id}
                className="border p-3 rounded-lg shadow-sm flex justify-between"
              >
                <div>
                  <p className="font-semibold">{show.bus_name}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(show.start_time).toLocaleString()}
                  </p>
                </div>

                <p className="text-gray-700 font-medium">
                  Seats: {show.total_seats}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
