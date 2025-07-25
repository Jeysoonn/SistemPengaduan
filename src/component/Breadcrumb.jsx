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
    'user' : 'User',
    'admin' : 'Dashboard',
    'security': 'Dashboard',
    'baak': 'Dashboard',
    'daftar-laporan' : 'Daftar Laporan',
    'riwayat-daftar-laporan' : 'Riwayat Laporan',
    'faq' : 'FAQ',
    // Tambahkan path lain sesuai kebutuhan
  };

  return (
    <nav className="flex items-center space-x-2 text-gray-500 mb-4">
      {/* Home Link */}
      <Link to="" className="hover:text-gray-700 flex items-center text-sm font-medium">
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
              <span className="text-gray-900 text-base font-semibold">
                {breadcrumbNameMap[name] || name}
              </span>
            ) : (
              <Link 
                to={routeTo} 
                className="hover:text-gray-700 text-sm font-medium"
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