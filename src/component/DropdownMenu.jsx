// DropdownMenu.js
import React, { useState } from 'react';

export default function DropdownMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex items-center ms-3">
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          aria-expanded={isDropdownOpen ? 'true' : 'false'}
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="user photo"
          />
        </button>
      </div>
      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600 absolute left-375 top-0"
          id="dropdown-user"
        >
          <div className="px-4 py-3">
            <p className="text-sm text-gray-900 dark:text-white">
              Neil Sims
            </p>
            <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
              neil.sims@flowbite.com
            </p>
          </div>
          <ul className="py-1">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
