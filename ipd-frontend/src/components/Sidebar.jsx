import { useUser } from "@clerk/clerk-react";

export default function Sidebar({ open, onSelect }) {
  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  const navItems = [
    { label: "📅 Today’s Patients", value: "today" },
    role === "admin" && { label: "📂 All Patients", value: "all" },
    { label: "➕ Add Patient", value: "add" },
    role === "admin" && { label: "👤 Add Receptionist", value: "receptionist" },
    
    role === "admin" && { label: "👤 All Receptionist", value: "showreceptionist" },

    role === "admin" && { label: "🩺 Add Doctor", value: "adddoctor" },

  
  ].filter(Boolean);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg z-50 transform transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <h2 className="text-2xl font-bold text-center text-indigo-400 mb-10 tracking-wide mt-6">
        🏥 IPD Panel
      </h2>

      <nav className="flex flex-col space-y-4 px-6">
        {navItems.map((item) => (
          <button
            key={item.value}
            onClick={() => onSelect(item.value)}
            className="text-left px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition cursor-pointer"
            
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-700 text-sm text-center text-gray-500">
        Role: <span className="capitalize text-indigo-400">{role}</span>
      </div>
    </aside>
  );
}
