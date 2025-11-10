import React, { useEffect, useState } from "react";
import "./SettingsManagement.css";
import { GoPackage, GoDotFill } from "react-icons/go";
import { vendorSettings } from "../../../../api/mutation";
import { toast } from "react-toastify";
import { getVendorId } from "../../../../api/query";

const SettingsManagement = () => {
  const vendorId = localStorage.getItem("vendorId");
  const [pricePerKg, setPricePerKg] = useState("");
  const [minimumOrder, setMinimumOrder] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [businessAvailability, setBusinessAvailability] = useState(true);
  const [inStock, setInStock] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [vendorOperationgHour, setVendorOperatingHour] = useState()

  const handleSettings = async () => {

    

    if (!vendorId) {
      toast.error("Vendor ID missing");
      return;
    }

    const payload = {
      pricePerKg: Number(pricePerKg),
      minimumOrder: Number(minimumOrder),
      openingTime,
      closingTime,
      businessAvailability,
      inStock,
    };

    setIsUpdating(true);
    try {
      const res = await vendorSettings(vendorId, payload);
      const updatedData = res?.data?.data;

      
      if (updatedData) {
        setPricePerKg(updatedData.pricePerKg || "");
        setMinimumOrder(updatedData.minimumOrder || "");
        setOpeningTime(updatedData.openingTime || "");
        setClosingTime(updatedData.closingTime || "");
        setBusinessAvailability(updatedData.businessAvailability);
        setInStock(updatedData.inStock);
      }

      toast.success("Settings updated successfully");
    } catch (error) {
      console.log("Error updating settings", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
  const getVendord = async () => {
    const id = localStorage.getItem(import.meta.env.VITE_VENDOR_ID);
    if (!id) {
      console.error("Vendor ID not found in localStorage");
      return;
    }

    try {
      const res = await getVendorId(id);
      const data = res?.data?.data;
      setVendorOperatingHour(data);

     
      setPricePerKg(data?.pricePerKg || "");
      setMinimumOrder(data?.minimumOrder || "");
      setOpeningTime(data?.openingTime || "");
      setClosingTime(data?.closingTime || "");

      
      setBusinessAvailability(
        data?.businessAvailability === "open" ? true : false
      );

      setInStock(Boolean(data?.inStock));
    } catch (error) {
      console.log("No data", error);
    }
  };

  getVendord();
}, []);

  return (
    <div className="settingsWrapper">
      <h2 className="settingsTitle">Settings</h2>

      {/* Pricing & Availability */}
      <div className="settingsCard">
        <h3>Pricing & Availability</h3>
        <div className="settingsRow">
          <div className="settingsInput">
            <label>Price per kg (₦)</label>
            <input
              type="number"
              placeholder="Enter price"
              value={pricePerKg}
              onChange={(e) => setPricePerKg(e.target.value)}
            />
          </div>
          <div className="settingsInput">
            <label>Minimum Order (kg)</label>
            <input
              type="number"
              placeholder="Enter minimum"
              value={minimumOrder}
              onChange={(e) => setMinimumOrder(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Operating Hours */}
      <div className="settingsCard">
        <h3>Operating Hours</h3>
        <div className="settingsRow">
          <div className="settingsInput">
            <label>Opening Time</label>
            <input
              type="text"
              placeholder="08:00 AM"
              value={openingTime}
              onChange={(e) => setOpeningTime(e.target.value)}
            />
          </div>
          <div className="settingsInput">
            <label>Closing Time</label>
            <input
              type="text"
              placeholder="06:00 PM"
              value={closingTime}
              onChange={(e) => setClosingTime(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Business Availability & Stock */}
      <div className="settingsCard toggles">
        <div className="toggleItem">
          <div className="toggleText">
            <p>Business Availability</p>
            <span style={{ color: businessAvailability ? "green" : "gray" }}>
              <GoDotFill />
              {businessAvailability ? "Open" : "Closed"}
            </span>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={businessAvailability}
              onChange={() => setBusinessAvailability(!businessAvailability)}
            />
            <span className="sliders"></span>
          </label>
        </div>

        <div className="toggleItem">
          <div className="toggleText">
            <p>Stock Status</p>
            <span style={{ color: inStock ? "green" : "red" }}>
              <GoPackage />
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={inStock}
              onChange={() => setInStock(!inStock)}
            />
            <span className="sliders"></span>
          </label>
        </div>

        <button
          className="updateBtn"
          onClick={handleSettings}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Settings"}
        </button>
      </div>
    </div>
  );
};

export default SettingsManagement;
