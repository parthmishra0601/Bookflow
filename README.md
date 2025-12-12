📘 BookFlow – Full Stack Bus Booking Application

BookFlow is a full-stack bus booking platform that allows users to browse available bus trips, select seats, and manage bookings.
It also includes an admin panel for creating and managing bus trips.

🚀 Tech Stack
Frontend

React.js

Tailwind CSS

Axios

Backend

Node.js

Express.js

PostgreSQL

pg (PostgreSQL client)

Deployment

Backend hosted on Render

Database hosted on Render PostgreSQL

📂 Project Structure
BookFlow/
├── backend/
│   ├── src/
│   │   ├── db.js
│   │   ├── index.js
│   │   └── routes/
│   │       ├── shows.js
│   │       └── bookings.js
│   └── package.json
│
├── frontend/
│   └── bookflow/
│       ├── src/
│       │   ├── Components/
│       │   ├── App.js
│       │   └── index.js
│       └── package.json
│
└── README.md

🔧 Backend API Endpoints
Fetch All Shows
GET /api/shows

Fetch Seats for a Show
GET /api/shows/:showId/seats

Create a New Bus Trip (Admin)
POST /api/shows

🗄️ Database Schema
Users Table
Column	Type
id	INT
name	TEXT
email	TEXT
Shows Table
Column	Type
id	INT
bus_name	TEXT
start_time	TIMESTAMP
total_seats	INT
created_at	TIMESTAMP
Seats Table
Column	Type
id	INT
show_id	INT
seat_number	INT
is_booked	BOOLEAN
Bookings Table
Column	Type
id	INT
user_id	INT
show_id	INT
status	TEXT
created_at	TIMESTAMP
updated_at	TIMESTAMP
Booking Seats Table
Column	Type
id	INT
booking_id	INT
seat_id	INT

⚙️ Environment Variables

Create a .env file in the backend directory:

DB_HOST=your_render_db_host
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=bookflow
PORT=5000

▶️ How to Run Locally
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend/bookflow
npm install
npm start

🌐 Deployment Links

Backend API:
https://bookflow-gk88.onrender.com

Sample API Test:
https://bookflow-gk88.onrender.com/api/shows

✅ Features Implemented

View available bus trips

Seat selection per bus

Booking management

Admin panel to create bus trips

PostgreSQL relational schema

RESTful APIs

Deployed backend and database

👤 Author

Parth Mishra
Full Stack Development Project – Modex Assessment




users.png

Commit & push:

git add README.md screenshots/
git commit -m "Add project README and database screenshots"
git push
