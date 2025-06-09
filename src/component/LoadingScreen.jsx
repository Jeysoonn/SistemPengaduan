import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent border-white"></div>
    </div>
  );
};

export default LoadingScreen;
