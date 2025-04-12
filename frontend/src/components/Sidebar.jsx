import React from "react";

const SidebarIcon = ({ icon, text, isOpen, isActive, onClick }) => (
  <li className={`mb-2 ${isActive ? "bg-blue-500 text-white" : ""} rounded-lg`}>
    <button
      onClick={onClick}
      className={`flex items-center w-full py-2 px-4 transition-colors duration-200 ${
        isActive
          ? "hover:bg-blue-600"
          : "hover:bg-gray-700 text-gray-300 hover:text-white"
      }`}
    >
      <span className="text-2xl mr-4">{icon}</span>
      {isOpen && <span className="text-sm">{text}</span>}
    </button>
  </li>
);

const Sidebar = ({ isOpen, toggleSidebar, activeItem, setActiveItem }) => {
  const items = [
    { id: "dashboard", icon: "📊", text: "Dashboard" },
    { id: "expenses", icon: "💰", text: "Expenses" },
    { id: "budget", icon: "📅", text: "Budget" },
    { id: "reports", icon: "📈", text: "Reports" },
    { id: "settings", icon: "⚙️", text: "Settings" },
    { id: "profile", icon: "👤", text: "Profile" }, // Added Profile item
  ];

  return (
    <div
      className={`bg-gray-800 text-white transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex justify-end p-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-300 hover:text-white"
        >
          {isOpen ? "◀" : "▶"}
        </button>
      </div>
      <div className="px-4">
        {isOpen && <h2 className="text-xl font-bold mb-6">Expense Tracker</h2>}
        <ul className="space-y-2">
          {items.map((item) => (
            <SidebarIcon
              key={item.id}
              icon={item.icon}
              text={item.text}
              isOpen={isOpen}
              isActive={activeItem === item.id}
              onClick={() => setActiveItem(item.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
