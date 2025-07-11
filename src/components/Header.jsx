import React from "react"; // useState tidak lagi dibutuhkan jika tidak ada dropdown
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react"; // Hanya butuh ChevronRight untuk breadcrumbs

const Header = () => {
  const navigate = useNavigate(); // Tetap dipertahankan jika Anda ingin menggunakannya nanti
  const location = useLocation();

  // Fungsi untuk membuat breadcrumbs berdasarkan path saat ini
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter(x => x);
    let currentPath = '';
    return [
      { name: 'Pages', path: '/' }, // Base breadcrumb
      ...pathnames.map((name, index) => {
        currentPath += `/${name}`;
        const isLast = index === pathnames.length - 1;
        return {
          name: name.charAt(0).toUpperCase() + name.slice(1),
          path: isLast ? '' : currentPath,
        };
      })
    ];
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <header className="fixed top-0 left-[280px] right-0 bg-white shadow-sm border-b py-4 px-6 flex items-center justify-between z-10">
      {/* Bagian Kiri: Breadcrumbs & Sapaan */}
      <div className="flex flex-col">
        <div className="flex items-center text-sm text-gray-500">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.name}>
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-blue-600">
                  {crumb.name}
                </Link>
              ) : (
                <span className="font-semibold text-gray-700">{crumb.name}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <ChevronRight className="h-3 w-3 mx-1" />
              )}
            </React.Fragment>
          ))}
        </div>
        <h2 className="text-xl font-bold text-gray-800 mt-1">Selamat Datang di Dashboard!</h2> {/* Sapaan yang lebih umum */}
      </div>

      {/* Bagian Kanan: Tulisan Baru yang Menarik */}
      <div className="flex items-center">
        <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 tracking-wide transform hover:scale-105 transition-transform duration-300 ease-in-out">
          AdminCore
        </span>
        {/* Contoh teks lain yang bisa digunakan: */}
        {/* <span className="text-xl font-bold text-blue-600 tracking-wider animate-pulse">
          Sistem Admin V.1.0
        </span> */}
        {/* <span className="text-lg font-semibold text-gray-700 italic">
          Pengelolaan Efisien
        </span> */}
      </div>
    </header>
  );
};

export default Header;