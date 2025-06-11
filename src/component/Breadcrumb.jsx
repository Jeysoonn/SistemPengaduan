import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Mapping path ke nama yang lebih readable
  const breadcrumbNameMap = {
    'bsti': 'Dashboard',
    'laporanpengaduan': 'Laporan Pengaduan',
    // Tambahkan path lain sesuai kebutuhan
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
      {/* Home Link */}
      <Link to="/bsti" className="hover:text-gray-700 flex items-center">
        <Home size={16} className="mr-2" />
        Home
      </Link>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        return (
          <React.Fragment key={name}>
            <span className="mx-2">/</span>
            {isLast ? (
              <span className="text-gray-900">
                {breadcrumbNameMap[name] || name}
              </span>
            ) : (
              <Link 
                to={routeTo} 
                className="hover:text-gray-700"
              >
                {breadcrumbNameMap[name] || name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;