import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Shield } from 'lucide-react';
import { useUser } from '../context/UserContext';

const AdminViewIndicator = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  // Only show indicator if user is Admin
  if (!user || user.role !== 'Admin') {
    return null;
  }

  const handleBack = () => {
    navigate('/admin');
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-lg shadow-lg border border-blue-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Eye size={16} />
            <Shield size={16} />
          </div>
          <div className="text-sm">
            <p className="font-semibold">Admin View</p>
            <p className="text-xs opacity-90">Viewing Mahasiswa Interface</p>
          </div>
          <button
            onClick={handleBack}
            className="ml-4 flex items-center gap-1 bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm font-medium"
          >
            <ArrowLeft size={14} />
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminViewIndicator; 