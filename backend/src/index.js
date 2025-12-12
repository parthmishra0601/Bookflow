const express = require("express");
const cors = require("cors");
require("dotenv").config();

const showsRoutes = require("./routes/shows");
const bookingsRoutes = require("./routes/bookings");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/shows", showsRoutes);
app.use("/api/bookings", bookingsRoutes);

app.get("/", (req, res) => {
  res.send("BookFlow API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
