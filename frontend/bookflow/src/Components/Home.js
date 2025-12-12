import React from "react";
import { Bus } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
      <div className="max-w-3xl bg-white rounded-2xl border border-slate-200 p-10 shadow-md text-center">
        
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
            <Bus size={28} className="text-indigo-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Welcome to BookFlow
        </h1>

        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          BookFlow is a simple and efficient bus booking platform designed to help
          users search available bus trips, select seats, and manage their bookings
          seamlessly.
        </p>

        <p className="text-slate-600 text-sm leading-relaxed">
          Built using React, Node.js, Express, and PostgreSQL, this application
          demonstrates a complete full-stack booking workflow with real-time seat
          availability and secure booking management.
        </p>

      </div>
    </div>
  );
}
