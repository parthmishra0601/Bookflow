import { useState } from "react";
import Sidebar from "./Components/Sidebar";
import Home from "./Components/Home";
import AvailableBuses from "./Components/AvailableBuses";
import SeatSelection from "./Components/SeatSelection";
import MyBookings from "./Components/MyBookings";
import AdminPage from "./Components/AdminPage";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [selectedShowId, setSelectedShowId] = useState(null);

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar setActivePage={setActivePage} activePage={activePage} />


      <div className="flex-1 p-6 overflow-auto">
        {activePage === "home" && <Home />}

        {activePage === "available" && (
          <AvailableBuses
            onViewSeats={(id) => {
              setSelectedShowId(id);
              setActivePage("seats");
            }}
          />
        )}

        {activePage === "seats" && (
          <SeatSelection
            showId={selectedShowId}
            userId={1}
            onBooked={() => setActivePage("bookings")}
          />
        )}

        {activePage === "bookings" && <MyBookings userId={1} />}

        {activePage === "admin" && <AdminPage />}
      </div>
    </div>
  );
}

export default App;
