// app/rooms/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash, Search, Home } from "lucide-react"; // Menambahkan icon Home

type Room = {
  id: number;
  name: string;
  capacity: number;
  status: 'Available' | 'Occupied' | 'Maintenance'; // Status ruangan
};

const RoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newRoom, setNewRoom] = useState<Room>({ id: 0, name: "", capacity: 0, status: "Available" });
  const [editRoom, setEditRoom] = useState<Room | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 5; // Jumlah ruangan per halaman

  useEffect(() => {
    // Simulasi pengambilan data ruangan dari API atau JSON lokal
    const fetchRoomsData = async () => {
      try {
        // Ganti dengan fetch API Anda yang sebenarnya:
        // const response = await fetch('/api/rooms');
        // const data: Room[] = await response.json();
        // setRooms(data);

        // Data dummy untuk pengembangan
        setRooms([
          { id: 1, name: "Meeting Room A", capacity: 10, status: "Available" },
          { id: 2, name: "Conference Hall B", capacity: 50, status: "Occupied" },
          { id: 3, name: "Small Office C", capacity: 4, status: "Maintenance" },
          { id: 4, name: "Lecture Room D", capacity: 100, status: "Available" },
          { id: 5, name: "Training Lab E", capacity: 20, status: "Available" },
          { id: 6, name: "Executive Suite F", capacity: 6, status: "Occupied" },
          { id: 7, name: "Breakout Room G", capacity: 8, status: "Maintenance" },
        ]);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      }
    };
    fetchRoomsData();
  }, []);

  const handleAddRoom = () => {
    if (newRoom.name && newRoom.capacity > 0) {
      setRooms([...rooms, { ...newRoom, id: rooms.length > 0 ? Math.max(...rooms.map(r => r.id)) + 1 : 1 }]);
      setNewRoom({ id: 0, name: "", capacity: 0, status: "Available" });
      setShowModal(false);
    }
  };

  const handleEditRoom = () => {
    if (editRoom) {
      setRooms(rooms.map((room) => (room.id === editRoom.id ? editRoom : room)));
      setEditRoom(null);
      setShowEditModal(false);
    }
  };

  const handleDeleteRoom = (id: number) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.capacity.toString().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Fungsi untuk mendapatkan warna status
  const getStatusColor = (status: Room['status']) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Occupied':
        return 'bg-red-100 text-red-800';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Room Management</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="relative flex-grow mr-4">
          <input
            type="text"
            placeholder="Search rooms..."
            className="w-full p-2 border rounded-lg text-gray-900 bg-white pl-10 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-colors duration-200"
          title="Add Room"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Capacity</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {currentRooms.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 px-6 text-center text-gray-500">No rooms found.</td>
              </tr>
            ) : (
              currentRooms.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 text-gray-800 dark:text-gray-200">
                  <td className="py-4 px-6 whitespace-nowrap">{room.id}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{room.name}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{room.capacity}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(room.status)}`}>
                      {room.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap flex space-x-2">
                    <button
                      onClick={() => {
                        setEditRoom(room);
                        setShowEditModal(true);
                      }}
                      className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-200"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteRoom(room.id)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
                      title="Delete"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Add Room */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add Room</h2>

            <label className="block text-gray-700 font-semibold mb-1">Room Name</label>
            <input
              type="text"
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              value={newRoom.name}
              onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
            />

            <label className="block text-gray-700 font-semibold mb-1">Capacity</label>
            <input
              type="number"
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              value={newRoom.capacity === 0 ? '' : newRoom.capacity} // Handle 0 value in input
              onChange={(e) => setNewRoom({ ...newRoom, capacity: parseInt(e.target.value) || 0 })}
            />

            <label className="block text-gray-700 font-semibold mb-1">Status</label>
            <select
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              value={newRoom.status}
              onChange={(e) => setNewRoom({ ...newRoom, status: e.target.value as Room['status'] })}
            >
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Maintenance">Maintenance</option>
            </select>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRoom}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Room */}
      {showEditModal && editRoom && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Room</h2>

            <label className="block text-gray-700 font-semibold mb-1">Room Name</label>
            <input
              type="text"
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              value={editRoom.name}
              onChange={(e) => setEditRoom({ ...editRoom, name: e.target.value })}
            />

            <label className="block text-gray-700 font-semibold mb-1">Capacity</label>
            <input
              type="number"
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              value={editRoom.capacity}
              onChange={(e) => setEditRoom({ ...editRoom, capacity: parseInt(e.target.value) || 0 })}
            />

            <label className="block text-gray-700 font-semibold mb-1">Status</label>
            <select
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              value={editRoom.status}
              onChange={(e) => setEditRoom({ ...editRoom, status: e.target.value as Room['status'] })}
            >
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Maintenance">Maintenance</option>
            </select>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleEditRoom}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => paginate(pageNumber)}
              className={`mx-1 px-3 py-1 rounded-lg ${
                currentPage === pageNumber ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors duration-200"
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomsPage;