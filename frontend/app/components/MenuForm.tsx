import React from "react";

interface MenuFormProps {
  selectedMenu: MenuItem | null;
  newNodeName: string;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
}

const MenuForm: React.FC<MenuFormProps> = ({
  selectedMenu,
  newNodeName,
  handleFormChange,
  handleFormSubmit,
}) => {
  if (!selectedMenu) return null;

  return (
    <div className="menu-form">
      <h3>Menu Form</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Menu ID</label>
          <input type="text" value={selectedMenu.id} readOnly />
        </div>
        <div className="form-group">
          <label>Depth</label>
          <input
            type="number"
            value={selectedMenu.parentId ? selectedMenu.parentId.split(".").length : 1}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Parent Data</label>
          <input type="text" value={selectedMenu.name} readOnly />
        </div>
        <div className="form-group">
          <label>New Node Name</label>
          <input
            type="text"
            value={newNodeName}
            onChange={handleFormChange}
            placeholder="Enter name"
          />
        </div>
        <button type="submit" className="save-btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default MenuForm;
