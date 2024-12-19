import React from "react";
import MenuTree from "./components/MenuTree";
import MenuForm from "./components/MenuForm";
import Sidebar from "./components/SideBar";

export default function Home() {
  return (
    <div className="main-container">
      <Sidebar />
      <div className="content">
        <MenuTree />
        <MenuForm />
      </div>
    </div>
  );
}
