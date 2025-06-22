import { MdOutlineMedicalServices } from "react-icons/md"; 
import { BiBarChart } from "react-icons/bi"; 
import { RiAccountPinBoxLine } from "react-icons/ri"; 
import { BiBookAlt } from "react-icons/bi"; 
import { MdDiscount } from "react-icons/md"; 
import { MdSystemUpdateAlt } from "react-icons/md"; 
import { GrTransaction } from "react-icons/gr"; 
import { MdOutlineCampaign } from "react-icons/md"; 
import { AiOutlineMail } from "react-icons/ai"; 


import {
  LayoutDashboard,
  BarChart2,
  Settings,
  LogIn,
  UserPlus,
  Contact,
  BookOpen,
  ActivitySquare,
  PackagePlus, 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard />, path: "/dashboard" },
  { name: "Manajemen Obat", icon: <MdOutlineMedicalServices />, path: "/obat" },
  { name: "Manajemen Transaksi", icon: <GrTransaction />, path: "/transaksi" },
  { name: "Manajemen Restock", icon:<MdSystemUpdateAlt /> , path: "/admin/restock" },
  { name: "Manajemen Promo", icon: <MdDiscount />, path: "/promo" },
  { name: "Manajemen Kampanye", icon: <MdOutlineCampaign />, path: "/admin/kampanye" },
  { name: "Manajemen FAQ", icon: <BiBookAlt />, path: "/admin/FAQAdmin" },
  { name: "Manajemen Account", icon: <RiAccountPinBoxLine />, path: "/pelanggan" },
  { name: "Manajemen keluhan", icon: <AiOutlineMail />, path: "/admin/keluhan" },
  { name: "Laporan Analisis", icon: <BiBarChart />, path: "/admin/laporan" },

];

const accountItems = [
  { name: "Pengaturan Akun", icon: <Settings />, path: "/admin/akun" },
  { name: "Sign In", icon: <LogIn />, path: "/login" },
  { name: "Sign Up", icon: <UserPlus />, path: "/signup" },
];

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
<aside className="bg-white w-64 min-h-screen max-h-screen overflow-y-auto shadow-lg px-4 py-6 hidden md:block">
      <div className="text-xl font-bold mb-8 text-purple-700">Dashboard Admin</div>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-100 transition ${
              isActive(item.path)
                ? "bg-purple-200 text-purple-800 font-semibold"
                : "text-gray-700"
            }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-8 text-xs font-semibold text-gray-500">AKUN</div>
      <nav className="mt-2 space-y-1">
        {accountItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-100 transition ${
              isActive(item.path)
                ? "bg-purple-200 text-purple-800 font-semibold"
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
