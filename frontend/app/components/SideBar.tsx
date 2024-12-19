import React from "react";

const Sidebar = () => {
  const menuItems = [
    { icon: "📂", label: "System Code" },
    { icon: "📂", label: "Menus", active: true },
    { icon: "📂", label: "Properties" },
    { icon: "📂", label: "API List" },
    { icon: "📂", label: "Users & Groups" },
  ];

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">CLQIT</h2>
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`menu-item ${item.active ? "active" : ""}`}
        >
          <span className="icon">{item.icon}</span>
          {item.label}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
