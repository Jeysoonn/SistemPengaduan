import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Panel */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
          <Outlet />
        </div>

        {/* Right Panel */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-500 to-green-500 items-center justify-center p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2 font-montserrat">Suara Anda Membentuk Perubahan</h3>
            <p className="text-sm font-montserrat">
              Laporkan permasalahan, saran, atau aspirasi Anda dengan mudah dan cepat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
