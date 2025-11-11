import React, { useState, useEffect } from "react";
import "./browsevendor.css";
import "./homecontent.css";
import { MdVerified } from "react-icons/md";
import { GoStar } from "react-icons/go";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiTimeFive } from "react-icons/bi";
import { RxCaretDown } from "react-icons/rx";
import OrderModal from "./modals/OrderModal";
import ViewVendor from "./modals/ViewVendor";
import { getNearbyVendors } from "../../../../../api/query";
import { useLoading } from "../../../../../context/LoadingContext";

const BrowseVendor = () => {
  const { loading, setLoading } = useLoading();
  const [showView, setShowView] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [findLocation, setFindLocation] = useState("");

  // ✅ Function to check if vendor is open
 // ✅ Function to check if vendor is open
const checkAvailability = (vendor) => {
  if (!vendor?.openingTime || !vendor?.closingTime) return vendor.isAvailable ?? true;

  const now = new Date();

  const parseTime = (timeStr) => {
    // Handles both "HH:MMam/pm" and "HH.MMam/pm" formats
    const match = timeStr.toLowerCase().match(/(\d+)[.:]?(\d+)?(am|pm)/);
    if (!match) return null;
    let hours = parseInt(match[1], 10);
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    const modifier = match[3];
    if (modifier === "pm" && hours !== 12) hours += 12;
    if (modifier === "am" && hours === 12) hours = 0;
    const d = new Date();
    d.setHours(hours, minutes, 0, 0);
    return d;
  };

  const opening = parseTime(vendor.openingTime);
  const closing = parseTime(vendor.closingTime);

  if (!opening || !closing) return vendor.isAvailable ?? true;

  return now >= opening && now <= closing;
};

//  Fetch vendors
useEffect(() => {
  const fetchVendors = async () => {
    try {
      setLoading(true);
      const res = await getNearbyVendors();
      console.log("Vendor data:", res.data.data);

      const updated = res.data.data.map((vendor) => ({
        ...vendor,
        isAvailable: checkAvailability(vendor), // fixed availability check
        isVerified: vendor.verificationStatus === "approved",
        isInStock: vendor.inStock === true,
      }));

      setVendors(updated);
    } catch (err) {
      console.error("Error fetching vendors:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchVendors();
}, [setLoading]);

  const openViewModal = (vendor) => {
    setSelectedVendor(vendor);
    setShowView(true);
  };

  const openOrderModal = (vendor) => {
    setSelectedVendor(vendor);
    setShowOrder(true);
  };

  //  Filter by location
  const filteredVendors = vendors.filter((vendor) =>
    !findLocation
      ? true
      : vendor.businessAddress
          ?.toLowerCase()
          .includes(findLocation.toLowerCase())
  );

  return (
    <main className="browsevendor" style={{ position: "relative" }}>
      {loading && <div className="global-loading">Loading...</div>}

      {showView && (
        <ViewVendor
          onClose={() => setShowView(false)}
          vendor={selectedVendor}
        />
      )}

      {showOrder && (
        <OrderModal
          onClose={() => setShowOrder(false)}
          vendor={selectedVendor}
        />
      )}

      <header className="heading">
        <div className="texts">
          <h3>Browse Vendor</h3>
          <span>Find and locate your vendors</span>
        </div>
      </header>

      <div className="search-bar">
        <input
          placeholder="Search location"
          className="searchinput"
          value={findLocation}
          onChange={(e) => setFindLocation(e.target.value)}
        />
        <div className="search-drop">
          <span>
            Newest first <RxCaretDown />
          </span>
        </div>
      </div>

      <section className="views extreme">
        {filteredVendors.length === 0 && <p>No vendors available</p>}

        {filteredVendors.map((vendor) => {
          const canOrder =
            vendor.isAvailable && vendor.isVerified && vendor.isInStock;

          return (
            <div key={vendor.id} className="order-holder">
              <div className="my-order">
                <div className="vendor-status">
                  <p>{vendor.businessName}</p>

                  <span
                    className={
                      vendor.isAvailable ? "available" : "unavailable"
                    }
                  >
                    {vendor.isAvailable ? "Available" : "Unavailable"}
                  </span>

                  {vendor.isVerified && (
                    <span className="verified">
                      <MdVerified /> Verified
                    </span>
                  )}
                </div>

                <div className="info">
                  <small>
                    <GoStar className="star" /> {vendor.rating || "—"}
                  </small>
                  <small>{vendor.distance || "—"}</small>
                  <small>
                    <TbCurrencyNaira className="the-currency" />
                    <span className="the-price">
                      {vendor.pricePerKg || "—"}/kg
                    </span>
                  </small>
                </div>

                <p className="vendor-time">
                  <BiTimeFive className="time-icon" />
                  <small>
                    {vendor.openingTime && vendor.closingTime
                      ? `${vendor.openingTime} - ${vendor.closingTime}`
                      : "—"}
                  </small>
                </p>
                <small>Mon - Sun</small>
              </div>

              <div className="right">
                <button
                  className="order-now"
                  onClick={() => openOrderModal(vendor)}
                  disabled={!canOrder}
                >
                  Order Now
                </button>
                <button
                  className="order-now to-view"
                  onClick={() => openViewModal(vendor)}
                >
                  View
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default BrowseVendor;
