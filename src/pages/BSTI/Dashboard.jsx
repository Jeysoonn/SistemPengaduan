import React, { useState } from 'react';
import '../../assets/style.css'; // Import your CSS styles here

const Dashboard = () => {
  // State to track the active menu item
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className={`flex flex-col md:flex-row`}>
      {/* Mobile Header */}
      <div className="deep-ui-sidebar py-4 px-4 flex items-center justify-between md:hidden">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#3034ff] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <h1 className="text-lg font-semibold">Sistem Pengaduan</h1>
        </div>
        <div className="flex items-center space-x-2"></div>
      </div>

      {/* Sidebar */}
      <div className={`deep-ui-sidebar transform -translate-x-full md:translate-x-0 fixed md:sticky top-0 left-0 max-h-screen min-h-screen overflow-y-auto z-30 w-72 flex flex-col transition-transform duration-300 ease-in-out`}>
        {/* Logo and Brand */}
        <div className="px-6 py-4 hidden md:block">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#3034ff] dark:bg-[#3034ff] rounded-xl flex items-center justify-center dark:shadow-lg dark:shadow-[#3034ff]/20">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <h1 className="text-xl font-semibold">Deep UI</h1>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-4 py-2 flex-1 overflow-y-auto">
          {/* Main Menu */}
          <div className="mb-6">
            <span className="px-3 text-xs font-medium deep-ui-heading uppercase tracking-wider">Menu</span>
            <div className="mt-3 space-y-1">
              <a
                href="#"
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-xl
                  ${activeMenu === 'dashboard' ? 'bg-[#3034ff] text-white' : 'hover:bg-[#f0f0f0] dark:hover:bg-[#3034ff]/20'}`
                }
                onClick={() => handleMenuClick('dashboard')}
              >
                <div className="p-1.5 rounded-lg deep-ui-icon-bg mr-3 dark:bg-[#3034ff]/20 dark:text-[#a5a6ff]">
                  <i data-feather="home" className="h-5 w-5"></i>
                </div>
                Dashboard
              </a>
              {/* Add more menu items here */}
              <a
                href="#"
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-xl
                  ${activeMenu === 'settings' ? 'bg-[#3034ff] text-white' : 'hover:bg-[#f0f0f0] dark:hover:bg-[#3034ff]/20'}`
                }
                onClick={() => handleMenuClick('settings')}
              >
                <div className="p-1.5 rounded-lg deep-ui-icon-bg mr-3 dark:bg-[#3034ff]/20 dark:text-[#a5a6ff]">
                  <i data-feather="settings" className="h-5 w-5"></i>
                </div>
                Settings
              </a>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="mt-auto border-t border-[var(--border)]">
          <div className="p-3">
            <div className="deep-ui-card p-3 rounded-xl flex items-center dark:backdrop-blur-sm">
              <div className="relative flex-shrink-0 avatar-ring">
                <div className="w-10 h-10 bg-[#ededff] dark:bg-[#3034ff]/20 rounded-full flex items-center justify-center">
                  <span className="text-[#3034ff] dark:text-[#a5a6ff] font-medium">BD</span>
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--card)]"></div>
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <p className="text-sm font-medium truncate">Berkay Derin</p>
                <p className="text-xs text-[var(--text-muted)] truncate">derinberkay67@gmail.com</p>
              </div>
              <button className="ml-auto deep-ui-button p-1.5 rounded-lg">
                <i data-feather="log-out" className="h-5 w-5"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-10 pt-0 md:pt-10">
        {/* Add your main content here */}
      </div>
    </div>
  );
};

export default Dashboard;
