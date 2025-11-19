import React, { useState, useEffect } from "react";
import "./browsevendor.css";
import "./homecontent.css";
import { MdVerified } from "react-icons/md";
import { GoStar } from "react-icons/go";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiTimeFive, BiSearch } from "react-icons/bi";
import OrderModal from "./modals/OrderModal";
import ViewVendor from "./modals/ViewVendor";
import { getNearbyVendors } from "../../../../../api/query";
import { useLoading } from "../../../../../context/LoadingContext";
import GlobalLoading from "../../../../../context/GlobalLoading"; 

const BrowseVendor = () => {
  const { loading, setLoading } = useLoading();
  const [showView, setShowView] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [findLocation, setFindLocation] = useState("");


const checkAvailability = (vendor) => {
  if (!vendor?.openingTime || !vendor?.closingTime) return vendor.isAvailable ?? true;

  const now = new Date();

  const parseTime = (timeStr) => {
    
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
        isAvailable: checkAvailability(vendor), 
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

  
  const filteredVendors = vendors.filter((vendor) =>
    !findLocation
      ? true
      : vendor.businessAddress
          ?.toLowerCase()
          .includes(findLocation.toLowerCase())
  );

  return (
    <main className="browsevendor" style={{ position: "relative" }}>
      <GlobalLoading />

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
  <div className="searchinput-wrapper">
    {!findLocation? <BiSearch className="search-icon" /> : null}
    <input
      placeholder="Search location"
      className="searchinput"
      value={findLocation}
      onChange={(e) => setFindLocation(e.target.value)}
    />
  </div>
</div>
      <section  className= {filteredVendors.length > 0? "views extreme": "empty"}>
        {filteredVendors.length === 0 && <div className="no-vendor"> <p>No vendors available yet</p></div>}

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
                          vendor.isAvailable
                            ? "vendor-status-available"
                            : "vendor-status-unavailable"
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
                {vendor.isVerified ? (
                  <>
                    <button
                      className="order-now"
                      onClick={() => openOrderModal(vendor)}
                      disabled={!canOrder}
                    >
                      Order Now
                    </button>
                    <button
                      className="to-view"
                      onClick={() => openViewModal(vendor)}
                    >
                      View
                    </button>
                  </>
                ) : (
                  <button className="vendor-not-verified" disabled>
                    Vendor Not Verified
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </section>
    </main>
  );
};

export default BrowseVendor;
