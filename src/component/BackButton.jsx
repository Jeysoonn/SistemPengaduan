import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useUser } from '../context/UserContext';

const BackButton = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  // Only show back button if user is Admin
  if (!user || user.role !== 'Admin') {
    return null;
  }

  const handleBack = () => {
    navigate('/admin');
  };

  return (
    <div className="fixed top-20 left-6 z-50">
      <button
        onClick={handleBack}
        className="flex items-center gap-2 bg-white text-[#2596be] px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:bg-gray-50"
      >
        <ArrowLeft size={20} />
        <span className="font-semibold">Back to Admin</span>
      </button>
    </div>
  );
};

export default BackButton; 