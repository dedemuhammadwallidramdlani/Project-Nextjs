"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash, Search } from "lucide-react"; // Pastikan lucide-react sudah terinstal

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const UsersPage = () => { // Mengganti nama komponen menjadi UsersPage agar konsisten
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newUser, setNewUser] = useState<User>({ id: 0, name: "", email: "", role: "" });
  const [editUser, setEditUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Jumlah pengguna per halaman

  useEffect(() => {
    // Simulasi pengambilan data dari users.json
    // Di aplikasi nyata, ini akan menjadi panggilan API
    const fetchUsersData = async () => {
      try {
        const response = await fetch("/users.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        // Fallback data jika fetch gagal, untuk tujuan pengembangan
        setUsers([
          { id: 1, name: "Alice Smith", email: "alice@example.com", role: "Admin" },
          { id: 2, name: "Bob Johnson", email: "bob@example.com", role: "User" },
          { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Editor" },
          { id: 4, name: "Diana Prince", email: "diana@example.com", role: "User" },
          { id: 5, name: "Eve Adams", email: "eve@example.com", role: "Admin" },
          { id: 6, name: "Frank White", email: "frank@example.com", role: "User" },
          { id: 7, name: "Grace Kelly", email: "grace@example.com", role: "Editor" },
        ]);
      }
    };
    fetchUsersData();
  }, []);

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      setUsers([...users, { ...newUser, id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1 }]);
      setNewUser({ id: 0, name: "", email: "", role: "" });
      setShowModal(false);
    }
  };

  const handleEditUser = () => {
    if (editUser) {
      setUsers(users.map((user) => (user.id === editUser.id ? editUser : user)));
      setEditUser(null);
      setShowEditModal(false);
    }
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8"> {/* Mengikuti layout Dashboard */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">User Management</h1> {/* Mengikuti gaya judul Dashboard */}

      <div className="flex justify-between items-center mb-4">
        <div className="relative flex-grow mr-4">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full p-2 border rounded-lg text-gray-900 bg-white pl-10 focus:ring-blue-500 focus:border-blue-500" // Menyesuaikan warna teks dan focus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" /> {/* Warna icon search */}
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-colors duration-200" // Menyesuaikan warna dan menambahkan transisi
          title="Add User"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md"> {/* Menambahkan shadow dan rounded-lg untuk kontainer tabel */}
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Role</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 px-6 text-center text-gray-500">No users found.</td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 text-gray-800 dark:text-gray-200">
                  <td className="py-4 px-6 whitespace-nowrap">{user.id}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{user.name}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{user.email}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{user.role}</td>
                  <td className="py-4 px-6 whitespace-nowrap flex space-x-2">
                    <button
                      onClick={() => {
                        setEditUser(user);
                        setShowEditModal(true);
                      }}
                      className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-200"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
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

      {/* Modal Add User */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> {/* z-50 untuk memastikan modal di atas segalanya */}
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"> {/* Menambah shadow dan max-width */}
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add User</h2>

            <label className="block text-gray-700 font-semibold mb-1">Name</label>
            <input
              type="text"
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />

            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />

            <label className="block text-gray-700 font-semibold mb-1">Role</label>
            <input
              type="text"
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            />

            <div className="mt-6 flex justify-end space-x-3"> {/* Menambah space-x */}
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit User */}
      {showEditModal && editUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Edit User</h2>

            <label className="block text-gray-700 font-semibold mb-1">Name</label>
            <input
              type="text"
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              value={editUser.name}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            />

            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            />

            <label className="block text-gray-700 font-semibold mb-1">Role</label>
            <input
              type="text"
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              value={editUser.role}
              onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
            />

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleEditUser}
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

export default UsersPage;