"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash, Search } from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newUser, setNewUser] = useState<User>({ id: 0, name: "", email: "", role: "" });
  const [editUser, setEditUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Jumlah pengguna per halaman

  useEffect(() => {
    fetch("/users.json")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-700 dark:text-white">Users</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="relative flex-grow mr-4">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full p-2 border rounded-lg text-gray pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray" />
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="p-2 bg-blue-500 text-white rounded-xl flex items-center justify-center"
          title="Add User"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="overflow-x-auto">
  <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
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
      {currentUsers.map((user) => (
        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200">
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
      ))}
    </tbody>
  </table>
</div>

      {/* Modal Add User */} 
      {showModal && ( 
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"> 
          <div className="bg-white p-6 rounded-lg w-96"> 
            <h2 className="text-xl font-bold mb-4 text-black">Add User</h2> 

            <label className="block text-black font-semibold mb-1">Name</label> 
            <input 
              type="text" 
              className="w-full mb-2 p-2 border rounded text-black" 
              value={newUser.name} 
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} 
            /> 

            <label className="block text-black font-semibold mb-1">Email</label> 
            <input 
              type="email" 
              className="w-full mb-2 p-2 border rounded text-black" 
              value={newUser.email} 
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} 
            /> 

            <label className="block text-black font-semibold mb-1">Role</label> 
            <input 
              type="text" 
              className="w-full mb-2 p-2 border rounded text-black" 
              value={newUser.role} 
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} 
            /> 

            <div className="mt-4 flex justify-end"> 
              <button onClick={handleAddUser} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Save</button> 
              <button onClick={() => setShowModal(false)} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg">Cancel</button> 
            </div> 
          </div> 
        </div> 
      )} 

      {/* Modal Edit User */} 
      {showEditModal && editUser && ( 
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"> 
          <div className="bg-white p-6 rounded-lg w-96"> 
            <h2 className="text-xl font-bold mb-4 text-black">Edit User</h2> 

            <label className="block text-black font-semibold mb-1">Name</label> 
            <input 
              type="text" 
              className="w-full mb-2 p-2 border rounded text-black" 
              value={editUser.name} 
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} 
            /> 

            <label className="block text-black font-semibold mb-1">Email</label> 
            <input 
              type="email" 
              className="w-full mb-2 p-2 border rounded text-black" 
              value={editUser.email} 
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} 
            /> 

            <label className="block text-black font-semibold mb-1">Role</label> 
            <input 
              type="text" 
              className="w-full mb-2 p-2 border rounded text-black" 
              value={editUser.role} 
              onChange={(e) => setEditUser({ ...editUser, role: e.target.value })} 
            /> 

            <div className="mt-4 flex justify-end"> 
              <button onClick={handleEditUser} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Save</button> 
              <button onClick={() => setShowEditModal(false)} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg">Cancel</button> 
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
                currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
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

export default Users;