import React from "react";
import "./SettingsManagement.css"

const SettingsManagement = () => {
  return (
    <div className="settingsWrapper">
      <h2 className="settingsTitle">Settings</h2>

      {/* Pricing & Availability */}
      <div className="settingsCard">
        <h3>Pricing & Availability</h3>
        <div className="settingsRow">
          <div className="settingsInput">
            <label>Price per kg (₦)</label>
            <input type="text" placeholder="Enter price" />
          </div>
          <div className="settingsInput">
            <label>Minimum Order (kg)</label>
            <input type="text" placeholder="Enter minimum" />
          </div>
        </div>
      </div>

      {/* Operating Hours */}
      <div className="settingsCard">
        <h3>Operating Hours</h3>
        <div className="settingsRow">
          <div className="settingsInput">
            <label>Opening Time</label>
            <input type="text" placeholder="09:00am" />
          </div>
          <div className="settingsInput">
            <label>Closing Time</label>
            <input type="text" placeholder="09:00pm" />
          </div>
        </div>
      </div>

      {/* Business Availability */}
      <div className="settingsCard toggles">
        <div className="toggleItem">
          <div className="toggleText">
            <p>Business Availability</p>
            <span>Open</span>
          </div>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggleItem">
          <div className="toggleText">
            <p>Stock Status</p>
            <span>In Stock</span>
          </div>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>

        <button className="updateBtn">Update Settings</button>
      </div>

      {/* Notification Preferences */}
      <div className="settingsCard">
        <h3>Notification Preferences</h3>

        <div className="notifyItem">
          <div>
            <p>New Order Alerts</p>
            <span>Get notified when new orders arrive</span>
          </div>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notifyItem">
          <div>
            <p>Customer Messages</p>
            <span>Receive customer inquiries and messages</span>
          </div>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notifyItem">
          <div>
            <p>Review Notifications</p>
            <span>Get notified about new reviews</span>
          </div>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsManagement;
