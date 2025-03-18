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
    { id: 4, name: "Room D", type: "Suite", status: "Available" },
    { id: 5, name: "Room E", type: "Deluxe", status: "Occupied" },
    { id: 6, name: "Room F", type: "Standard", status: "Available" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Jumlah item per halaman

  const totalRooms = rooms.length;
  const availableRooms = rooms.filter((room) => room.status === "Available").length;
  const occupiedRooms = rooms.filter((room) => room.status === "Occupied").length;
  const roomTypes = [...new Set(rooms.map((room) => room.type))].length;

  // Filter rooms berdasarkan search query
  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Hitung total halaman
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);

  // Ambil data untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk berpindah halaman
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddRoom = () => {
    setEditingRoom({ id: rooms.length + 1, name: "", type: "", status: "Available" });
    setShowModal(true);
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
    setShowModal(true);
  };

  const handleDeleteRoom = (id: number) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  const handleSaveRoom = (room: Room) => {
    if (room.id === rooms.length + 1) {
      // Add new room
      setRooms([...rooms, room]);
    } else {
      // Edit existing room
      setRooms(rooms.map((r) => (r.id === room.id ? room : r)));
    }
    setShowModal(false);
    setEditingRoom(null);
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
            {currentRooms.map((room) => (
              <tr key={room.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="py-3 px-6">{room.id}</td>
                <td className="py-3 px-6">{room.name}</td>
                <td className="py-3 px-6">{room.type}</td>
                <td className="py-3 px-6">{room.status}</td>
                <td className="py-3 px-6 flex justify-center space-x-2">
                  <button
                    className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    onClick={() => handleEditRoom(room)}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={() => handleDeleteRoom(room.id)}
                  >
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredRooms.length)} of {filteredRooms.length} entries
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>

      {showModal && editingRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              {editingRoom.id === rooms.length + 1 ? "Add Room" : "Edit Room"}
            </h2>
            <input
              type="text"
              placeholder="Room Name"
              className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
              value={editingRoom.name}
              onChange={(e) => setEditingRoom({ ...editingRoom, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Room Type"
              className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
              value={editingRoom.type}
              onChange={(e) => setEditingRoom({ ...editingRoom, type: e.target.value })}
            />
            <select
              className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
              value={editingRoom.status}
              onChange={(e) => setEditingRoom({ ...editingRoom, status: e.target.value })}
            >
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => handleSaveRoom(editingRoom)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;