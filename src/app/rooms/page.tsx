"use client";

import { useState } from "react";
import { Plus, Pencil, Trash, Search, X, Home, CheckCircle, XCircle, Layers } from "lucide-react";

type Room = {
  id: number;
  name: string;
  type: string;
  status: string;
};

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([
    { id: 1, name: "Room A", type: "Suite", status: "Available" },
    { id: 2, name: "Room B", type: "Deluxe", status: "Occupied" },
    { id: 3, name: "Room C", type: "Standard", status: "Available" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  const totalRooms = rooms.length;
  const availableRooms = rooms.filter((room) => room.status === "Available").length;
  const occupiedRooms = rooms.filter((room) => room.status === "Occupied").length;
  const roomTypes = [...new Set(rooms.map((room) => room.type))].length;

  const handleAddRoom = () => {
    setEditingRoom({ id: rooms.length + 1, name: "", type: "", status: "Available" });
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Room Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-blue-500 text-white rounded-lg flex items-center space-x-3">
          <Home size={32} />
          <div>
            <p className="text-lg font-semibold">Total Rooms</p>
            <p className="text-2xl font-bold">{totalRooms}</p>
          </div>
        </div>
        <div className="p-4 bg-green-500 text-white rounded-lg flex items-center space-x-3">
          <CheckCircle size={32} />
          <div>
            <p className="text-lg font-semibold">Available</p>
            <p className="text-2xl font-bold">{availableRooms}</p>
          </div>
        </div>
        <div className="p-4 bg-red-500 text-white rounded-lg flex items-center space-x-3">
          <XCircle size={32} />
          <div>
            <p className="text-lg font-semibold">Occupied</p>
            <p className="text-2xl font-bold">{occupiedRooms}</p>
          </div>
        </div>
        <div className="p-4 bg-yellow-500 text-white rounded-lg flex items-center space-x-3">
          <Layers size={32} />
          <div>
            <p className="text-lg font-semibold">Room Types</p>
            <p className="text-2xl font-bold">{roomTypes}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search rooms..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full dark:bg-gray-800 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={handleAddRoom}>
          <Plus size={24} />
        </button>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="py-3 px-6">{room.id}</td>
                <td className="py-3 px-6">{room.name}</td>
                <td className="py-3 px-6">{room.type}</td>
                <td className="py-3 px-6">{room.status}</td>
                <td className="py-3 px-6 flex justify-center space-x-2">
                  <button className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                    <Pencil size={18} />
                  </button>
                  <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rooms;
