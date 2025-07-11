import { MdOutlineMedicalServices, MdDiscount, MdSystemUpdateAlt, MdOutlineCampaign, MdAddLocationAlt, MdHistory } from "react-icons/md";
import { BiBarChart, BiBookAlt } from "react-icons/bi";
import { RiAccountPinBoxLine } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { AiOutlineMail, AiOutlineShoppingCart } from "react-icons/ai";
import { FaBriefcaseMedical } from "react-icons/fa";
import { CiDiscount1 } from "react-icons/ci";

import {
  LayoutDashboard,
  BarChart2,
  Settings,
  LogIn,
  UserPlus,
  Contact
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard />, path: "/dashboard" },
  { name: "Manajemen Obat", icon: <MdOutlineMedicalServices />, path: "/obat" },
  { name: "Manajemen Restock", icon: <MdSystemUpdateAlt />, path: "/admin/restock" },
  { name: "Manajemen Promo", icon: <MdDiscount />, path: "/promo-list" },
  { name: "Manajemen Kampanye", icon: <MdOutlineCampaign />, path: "/admin/kampanye" },
  { name: "Manajemen FAQ", icon: <BiBookAlt />, path: "/admin/FAQAdmin" },
  { name: "Manajemen Akun", icon: <RiAccountPinBoxLine />, path: "/pelanggan" },
  { name: "Manajemen Keluhan", icon: <AiOutlineMail />, path: "/admin/keluhan" },
  { name: "Laporan Analisis", icon: <BiBarChart />, path: "/admin/laporan" },
  { name: "Riwayat Transaksi", icon: <MdHistory />, path: "/riwayat" },
  { name: "Alamat Pelanggan", icon: <MdAddLocationAlt />, path: "/alamat" }
];

const accountItems = [
  { name: "Pengaturan Akun", icon: <Settings />, path: "/admin/akun" },
  { name: "Sign In", icon: <LogIn />, path: "/login" },
  { name: "Sign Up", icon: <UserPlus />, path: "/signup" }
];

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
   <aside className="bg-white w-68 shadow-lg px-4 py-6 hidden md:block fixed top-0 left-0 h-screen overflow-y-auto">
      <div className="text-xl font-bold mb-8 text-blue-700">Dashboard Admin</div>

      {/* Navigasi Utama */}
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 transition ${
              isActive(item.path)
                ? "bg-blue-200 text-blue-800 font-semibold"
                : "text-gray-700"
            }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Akun */}
      <div className="mt-8 text-xs font-semibold text-gray-500">AKUN</div>
      <nav className="mt-2 space-y-1">
        {accountItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 transition ${
              isActive(item.path)
                ? "bg-blue-200 text-blue-800 font-semibold"
                : "text-gray-700"
            }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
