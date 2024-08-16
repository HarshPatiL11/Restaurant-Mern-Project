import React, { useState } from "react";
import "../Css/AdminPanel.css";

const VendorPanel = () => {
  const [restVisible, setRestVisible] = useState(false);

  const toggleRestVisibility = () => setRestVisible(!restVisible);

  return (
    <div className="adminPanelContainer">
      <h4 className="Compheader">Admin panel</h4>

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
      </div>
    </div>
  );
};

export default VendorPanel;
