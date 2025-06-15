import React, { useState, useEffect } from "react";
import { userAPI } from "../../service/apiUser";
import Breadcrumb from "../../component/Breadcrumb";

export default function Laporan() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    role: "",
    password: ""
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Semua");
  const roleTabs = ["Semua", "Mahasiswa", "Bsti", "Admin", "Security", "Baak"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userAPI.fetchUser();
        if (Array.isArray(data)) {
          setUserList(data);
        } else {
          console.error("Data yang diterima bukan array:", data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditModalOpen = (user) => {
    setSelectedUser(user);
    setFormData({
      nama: user.nama,
      email: user.email,
      role: user.role,
      password: ""
    });
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (!payload.password) {
        delete payload.password;
      }
      await userAPI.updateUser(selectedUser.id_user, payload);
      const updatedData = await userAPI.fetchUser();
      setUserList(updatedData);
      handleEditModalClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      try {
        await userAPI.deleteUser(id);
        const updatedData = await userAPI.fetchUser();
        setUserList(updatedData);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  // Filter userList berdasarkan tab
  const filteredUserList = activeTab === "Semua"
    ? userList
    : userList.filter(user => user.role && user.role.toLowerCase() === activeTab.toLowerCase());

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 text-gray-900">
      <h2 className="text-2xl font-semibold mt-6 mb-4">Tabel User</h2>
      <Breadcrumb />
      {/* Tabs Role */}
      <div className="flex space-x-2 mb-4 overflow-x-auto">
        {roleTabs.map((role) => (
          <button
            key={role}
            onClick={() => setActiveTab(role)}
            className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
              activeTab === role
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {role}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">ID User</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Nama</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Role</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredUserList.length > 0 ? (
              filteredUserList.map((user) => (
                <tr key={user.id_user} className="border-t border-gray-200">
                  <td className="px-4 py-2 text-sm text-gray-700">{user.id_user}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{user.nama}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{user.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{user.role}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditModalOpen(user)}
                        className="px-3 py-1 text-white bg-yellow-500 hover:bg-yellow-600 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id_user)}
                        className="px-3 py-1 text-white bg-red-500 hover:bg-red-600 rounded"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-sm text-gray-700 text-center">
                  Tidak ada data untuk ditampilkan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">Edit User</h3>
              <button onClick={handleEditModalClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-4">
              <form className="space-y-4" onSubmit={handleEditSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama</label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Pilih Role</option>
                    <option value="Mahasiswa">Mahasiswa</option>
                    <option value="Bsti">Bsti</option>
                    <option value="Admin">Admin</option>
                    <option value="Security">Security</option>
                    <option value="Baak">Baak</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password (Opsional)</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Kosongkan jika tidak ingin mengubah password"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={handleEditModalClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
