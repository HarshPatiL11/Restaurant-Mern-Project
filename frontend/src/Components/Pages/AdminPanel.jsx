import React, { useState } from "react";
import "../Css/AdminPanel.css";

const AdminPanel = () => {
    
  const [adminVisible, setAdminVisible] = useState(false);
  const [restVisible, setRestVisible] = useState(false);
  const [userVisible, setUserVisible] = useState(false);

  const toggleAdminVisibility = () => setAdminVisible(!adminVisible);
  const toggleRestVisibility = () => setRestVisible(!restVisible);
  const toggleUserVisibility = () => setUserVisible(!userVisible);

  return (
    <div className="adminPanelContainer">
      <h4 className="Compheader" onClick={toggleAdminVisibility}>
        {adminVisible ? "Hide Admin Controls" : "View Admin Controls"}
      </h4>

      {adminVisible && (
        <div className="ViewAdminPanel">
          <div className="panelDiv">
            <div className="RestCntrl">
              <div className="CtrHeader">
                <h6>View Restaurant Controls</h6>
                <label onClick={toggleRestVisibility}>
                  {restVisible ? "Hide" : "View"}
                </label>
              </div>
              <div className={`hiddenContent ${restVisible ? "visible" : ""}`}>
                Restaurant Controls Content
              </div>
            </div>
            <div className="UserCntrl">
              <div className="CtrHeader">
                <h6>View User Controls</h6>
                <label onClick={toggleUserVisibility}>
                  {userVisible ? "Hide" : "View"}
                </label>
              </div>
              <div className={`hiddenContent ${userVisible ? "visible" : ""}`}>
                User Controls Content
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
