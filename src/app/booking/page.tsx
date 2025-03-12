"use client";

import { useState } from "react";
import { Plus, Pencil, Trash, Search, X } from "lucide-react";

type Booking = {
  id: number;
  customer: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: string;
};

const Bookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([
        { id: 1, customer: "John Doe", room: "Room A", checkIn: "2025-03-10", checkOut: "2025-03-15", status: "Confirmed" },
        { id: 2, customer: "Jane Smith", room: "Room B", checkIn: "2025-03-12", checkOut: "2025-03-18", status: "Pending" },
        { id: 3, customer: "Alice Johnson", room: "Room C", checkIn: "2025-03-14", checkOut: "2025-03-20", status: "Checked In" },
      ]);
      
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  

  const handleAddBooking = () => {
    setEditingBooking({ id: Date.now(), customer: "", room: "", checkIn: "", checkOut: "", status: "Pending" });
    setShowModal(true);
  };

  const handleSaveBooking = () => {
    if (!editingBooking) return;
    setBookings((prev) => {
      const exists = prev.find((b) => b.id === editingBooking.id);
      return exists
        ? prev.map((b) => (b.id === editingBooking.id ? editingBooking : b))
        : [...prev, editingBooking];
    });
    setShowModal(false);
    setEditingBooking(null);
  };

  const handleDeleteBooking = (id: number) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Booking Management</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search bookings..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full dark:bg-gray-800 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={handleAddBooking}>
          <Plus size={24} />
        </button>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Customer</th>
              <th className="py-3 px-6 text-left">Room</th>
              <th className="py-3 px-6 text-left">Check-In</th>
              <th className="py-3 px-6 text-left">Check-Out</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="py-3 px-6">{booking.id}</td>
                <td className="py-3 px-6">{booking.customer}</td>
                <td className="py-3 px-6">{booking.room}</td>
                <td className="py-3 px-6">{booking.checkIn}</td>
                <td className="py-3 px-6">{booking.checkOut}</td>
                <td className="py-3 px-6">{booking.status}</td>
                <td className="py-3 px-6 flex justify-center space-x-2">
                  <button onClick={() => { setEditingBooking(booking); setShowModal(true); }} className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => handleDeleteBooking(booking.id)} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{editingBooking?.id ? "Edit" : "Add"} Booking</h2>
            <input type="text" className="w-full mb-2 p-2 border rounded" placeholder="Customer Name" value={editingBooking?.customer || ""} onChange={(e) => setEditingBooking({ ...editingBooking!, customer: e.target.value })} />
            <input type="text" className="w-full mb-2 p-2 border rounded" placeholder="Room" value={editingBooking?.room || ""} onChange={(e) => setEditingBooking({ ...editingBooking!, room: e.target.value })} />
            <input type="date" className="w-full mb-2 p-2 border rounded" value={editingBooking?.checkIn || ""} onChange={(e) => setEditingBooking({ ...editingBooking!, checkIn: e.target.value })} />
            <input type="date" className="w-full mb-2 p-2 border rounded" value={editingBooking?.checkOut || ""} onChange={(e) => setEditingBooking({ ...editingBooking!, checkOut: e.target.value })} />
            <input type="text" className="w-full mb-2 p-2 border rounded" placeholder="Status" value={editingBooking?.status || ""} onChange={(e) => setEditingBooking({ ...editingBooking!, status: e.target.value })} />
            <div className="flex justify-between mt-4">
              <button onClick={handleSaveBooking} className="p-2 bg-blue-600 text-white rounded w-1/2 mr-2">Save</button>
              <button onClick={() => setShowModal(false)} className="p-2 bg-gray-500 text-white rounded w-1/2">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
