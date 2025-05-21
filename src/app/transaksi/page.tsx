// app/transactions/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash, Search, DollarSign } from "lucide-react"; // Menambahkan icon DollarSign

type Transaction = {
  id: number;
  userId: number;
  userName: string; // Tambahkan untuk tampilan
  roomId: number;
  roomName: string; // Tambahkan untuk tampilan
  amount: number;
  date: string; // Format YYYY-MM-DD
  status: 'Pending' | 'Completed' | 'Cancelled';
};

// Data dummy untuk users dan rooms (biasanya diambil dari API terpisah)
// Ini diperlukan untuk dropdown di modal dan menampilkan nama di tabel
const dummyUsers = [
  { id: 1, name: "Alice Smith" },
  { id: 2, name: "Bob Johnson" },
  { id: 3, name: "Charlie Brown" },
];

const dummyRooms = [
  { id: 1, name: "Meeting Room A" },
  { id: 2, name: "Conference Hall B" },
  { id: 3, name: "Small Office C" },
];


const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: 0,
    userId: 0,
    userName: "",
    roomId: 0,
    roomName: "",
    amount: 0,
    date: "",
    status: "Pending",
  });
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5; // Jumlah transaksi per halaman

  useEffect(() => {
    // Simulasi pengambilan data transaksi
    const fetchTransactionsData = async () => {
      try {
        // Ganti dengan fetch API Anda yang sebenarnya:
        // const response = await fetch('/api/transactions');
        // const data: Transaction[] = await response.json();
        // setTransactions(data);

        // Data dummy untuk pengembangan
        setTransactions([
          { id: 1, userId: 1, userName: "Alice Smith", roomId: 1, roomName: "Meeting Room A", amount: 500000, date: "2024-05-15", status: "Completed" },
          { id: 2, userId: 2, userName: "Bob Johnson", roomId: 2, roomName: "Conference Hall B", amount: 1500000, date: "2024-05-16", status: "Pending" },
          { id: 3, userId: 1, userName: "Alice Smith", roomId: 3, roomName: "Small Office C", amount: 200000, date: "2024-05-17", status: "Completed" },
          { id: 4, userId: 3, userName: "Charlie Brown", roomId: 1, roomName: "Meeting Room A", amount: 600000, date: "2024-05-18", status: "Cancelled" },
          { id: 5, userId: 2, userName: "Bob Johnson", roomId: 3, roomName: "Small Office C", amount: 250000, date: "2024-05-19", status: "Pending" },
        ]);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };
    fetchTransactionsData();
  }, []);

  const handleAddTransaction = () => {
    if (newTransaction.userId && newTransaction.roomId && newTransaction.amount > 0 && newTransaction.date) {
      // Dapatkan nama pengguna dan ruangan berdasarkan ID yang dipilih
      const selectedUser = dummyUsers.find(u => u.id === newTransaction.userId);
      const selectedRoom = dummyRooms.find(r => r.id === newTransaction.roomId);

      setTransactions([...transactions, {
        ...newTransaction,
        id: transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1,
        userName: selectedUser ? selectedUser.name : "N/A",
        roomName: selectedRoom ? selectedRoom.name : "N/A",
      }]);
      setNewTransaction({ id: 0, userId: 0, userName: "", roomId: 0, roomName: "", amount: 0, date: "", status: "Pending" });
      setShowModal(false);
    }
  };

  const handleEditTransaction = () => {
    if (editTransaction) {
      // Dapatkan nama pengguna dan ruangan berdasarkan ID yang dipilih
      const selectedUser = dummyUsers.find(u => u.id === editTransaction.userId);
      const selectedRoom = dummyRooms.find(r => r.id === editTransaction.roomId);

      setTransactions(transactions.map((transaction) =>
        transaction.id === editTransaction.id
          ? {
              ...editTransaction,
              userName: selectedUser ? selectedUser.name : "N/A",
              roomName: selectedRoom ? selectedRoom.name : "N/A",
            }
          : transaction
      ));
      setEditTransaction(null);
      setShowEditModal(false);
    }
  };

  const handleDeleteTransaction = (id: number) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.date.includes(searchTerm) // Pencarian tanggal
  );

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Fungsi untuk mendapatkan warna status transaksi
  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Transaction History</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="relative flex-grow mr-4">
          <input
            type="text"
            placeholder="Search transactions..."
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
          title="Add Transaction"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">User</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Room</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Amount</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {currentTransactions.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-4 px-6 text-center text-gray-500">No transactions found.</td>
              </tr>
            ) : (
              currentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 text-gray-800 dark:text-gray-200">
                  <td className="py-4 px-6 whitespace-nowrap">{transaction.id}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{transaction.userName}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{transaction.roomName}</td>
                  <td className="py-4 px-6 whitespace-nowrap">Rp {transaction.amount.toLocaleString('id-ID')}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{transaction.date}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap flex space-x-2">
                    <button
                      onClick={() => {
                        setEditTransaction(transaction);
                        setShowEditModal(true);
                      }}
                      className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-200"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteTransaction(transaction.id)}
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

      {/* Modal Add Transaction */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Transaction</h2>

            <label className="block text-gray-700 font-semibold mb-1">User</label>
            <select
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              value={newTransaction.userId}
              onChange={(e) => setNewTransaction({ ...newTransaction, userId: parseInt(e.target.value) || 0 })}
            >
              <option value={0}>Select User</option>
              {dummyUsers.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>

            <label className="block text-gray-700 font-semibold mb-1">Room</label>
            <select
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              value={newTransaction.roomId}
              onChange={(e) => setNewTransaction({ ...newTransaction, roomId: parseInt(e.target.value) || 0 })}
            >
              <option value={0}>Select Room</option>
              {dummyRooms.map(room => (
                <option key={room.id} value={room.id}>{room.name}</option>
              ))}
            </select>

            <label className="block text-gray-700 font-semibold mb-1">Amount (Rp)</label>
            <input
              type="number"
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              value={newTransaction.amount === 0 ? '' : newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseInt(e.target.value) || 0 })}
            />

            <label className="block text-gray-700 font-semibold mb-1">Date</label>
            <input
              type="date"
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              value={newTransaction.date}
              onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
            />

            <label className="block text-gray-700 font-semibold mb-1">Status</label>
            <select
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              value={newTransaction.status}
              onChange={(e) => setNewTransaction({ ...newTransaction, status: e.target.value as Transaction['status'] })}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTransaction}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Transaction */}
      {showEditModal && editTransaction && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Transaction</h2>

            <label className="block text-gray-700 font-semibold mb-1">User</label>
            <select
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              value={editTransaction.userId}
              onChange={(e) => setEditTransaction({ ...editTransaction, userId: parseInt(e.target.value) || 0 })}
            >
              <option value={0}>Select User</option>
              {dummyUsers.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>

            <label className="block text-gray-700 font-semibold mb-1">Room</label>
            <select
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              value={editTransaction.roomId}
              onChange={(e) => setEditTransaction({ ...editTransaction, roomId: parseInt(e.target.value) || 0 })}
            >
              <option value={0}>Select Room</option>
              {dummyRooms.map(room => (
                <option key={room.id} value={room.id}>{room.name}</option>
              ))}
            </select>

            <label className="block text-gray-700 font-semibold mb-1">Amount (Rp)</label>
            <input
              type="number"
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              value={editTransaction.amount}
              onChange={(e) => setEditTransaction({ ...editTransaction, amount: parseInt(e.target.value) || 0 })}
            />

            <label className="block text-gray-700 font-semibold mb-1">Date</label>
            <input
              type="date"
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              value={editTransaction.date}
              onChange={(e) => setEditTransaction({ ...editTransaction, date: e.target.value })}
            />

            <label className="block text-gray-700 font-semibold mb-1">Status</label>
            <select
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              value={editTransaction.status}
              onChange={(e) => setEditTransaction({ ...editTransaction, status: e.target.value as Transaction['status'] })}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleEditTransaction}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                Save</button>
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

export default TransactionsPage;