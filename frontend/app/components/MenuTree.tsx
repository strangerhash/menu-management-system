"use client";

import React, { useEffect, useState } from "react";
import MenuForm from "./MenuForm";

interface MenuItem {
  id: string;
  name: string;
  parentId: string | null;
  children: MenuItem[];
}

const MenuTree: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [newNodeName, setNewNodeName] = useState<string>("");

  const fetchMenuData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/menu"); // Replace with your backend API endpoint
      if (!response.ok) {
        throw new Error(`Failed to fetch menus: ${response.statusText}`);
      }
      const data = await response.json();
      setMenuData(data.data); // Assuming the API returns { data: [] }
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  const toggleMenu = (menuId: string) => {
    setOpenMenus((prev) => ({ ...prev, [menuId]: !prev[menuId] }));
  };

  const handleMenuClick = (menu: MenuItem) => {
    setSelectedMenu(menu);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNodeName(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newNodeName) {
      alert("Please enter a name for the new node.");
      return;
    }

    const newNode = {
      name: newNodeName,
      parentId: selectedMenu?.id || null,
    };

    try {
      const response = await fetch("http://localhost:3001/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNode),
      });

      if (response.ok) {
        const createdNode = await response.json();
        // Update the tree with the new node
        setMenuData((prevMenus) => {
          const addChildToParent = (menuList: MenuItem[]) =>
            menuList.map((menu) => {
              if (menu.id === newNode.parentId) {
                return {
                  ...menu,
                  children: [...menu.children, createdNode],
                };
              }
              if (menu.children.length > 0) {
                return {
                  ...menu,
                  children: addChildToParent(menu.children),
                };
              }
              return menu;
            });

          return newNode.parentId ? addChildToParent(prevMenus) : [...prevMenus, createdNode];
        });

        setNewNodeName(""); // Reset input
        alert("Node created successfully!");
      } else {
        alert("Failed to create node.");
      }
    } catch (error) {
      console.error("Error creating node:", error);
    }
  };

  const renderMenu = (menuItems: MenuItem[]) => (
    <ul>
      {menuItems.map((menu) => (
        <li key={menu.id}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: "8px",
            }}
          >
            <button
              onClick={() => toggleMenu(menu.id)}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              {menu.children.length > 0 && (openMenus[menu.id] ? "-" : "+")}
            </button>
            <span onClick={() => handleMenuClick(menu)}>{menu.name}</span>
            <button
              onClick={() => handleFormSubmit}
              style={{
                borderRadius: "50%",
                border: "1px solid #000",
                background: "none",
                cursor: "pointer",
                fontSize: "16px",
                padding: "2px",
                marginLeft: "auto",
              }}
            >
              +
            </button>
            {menu.children.length > 0 && (
              <button
                onClick={() => toggleMenu(menu.id)}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  marginLeft: "auto",
                }}
              >
                ▼
              </button>
            )}
          </div>
          {menu.children.length > 0 && openMenus[menu.id] && (
            <div style={{ marginLeft: "20px" }}>{renderMenu(menu.children)}</div>
          )}
        </li>
      ))}
    </ul>
  );

  if (loading) {
    return <div>Loading menus...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="menu-tree">
      <h3>Menu Management</h3>
      {renderMenu(menuData)}
      <div style={{ marginTop: "20px" }}>
        <button className="save-btn" onClick={() => setOpenMenus({})}>
          Expand All
        </button>
        <button className="save-btn" onClick={() => setOpenMenus({})}>
          Collapse All
        </button>
      </div>
      {selectedMenu && (
        <MenuForm
          selectedMenu={selectedMenu}
          newNodeName={newNodeName}
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default MenuTree;
