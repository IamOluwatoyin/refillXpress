import React, { useState, useEffect } from "react";
import "./browsevendor.css";
import "./homecontent.css";
import { MdVerified } from "react-icons/md";
import { GoStar } from "react-icons/go";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiTimeFive } from "react-icons/bi";
import { RxCaretDown } from "react-icons/rx";
import { LuSearch } from "react-icons/lu";
import { BsArrowRight } from "react-icons/bs";
import OrderModal from "./modals/OrderModal";
import ViewVendor from "./modals/ViewVendor";
import { getNearbyVendors } from "../../../../../api/query";
import { useLoading } from '../../../../../context/LoadingContext';

const BrowseVendor = () => {
  const { loading, setLoading } = useLoading(); // global loading
  const [showView, setShowView] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [findLocation, setFindloacation] = useState("");

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true); // show global loading
        const res = await getNearbyVendors();
        setVendors(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // hide global loading
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

  const filteredLocation = vendors.filter((item) => {
    if (!findLocation) return true;
    return item.businessAddress?.includes(findLocation);
  });

  return (
    <main className="browsevendor"  style={{ position: "relative" }}>
      {/* Global Loading Overlay */}
      {loading && (
        <div className="global-loading">
          Loading...
        </div>
      )}

      {showView && <ViewVendor onClose={() => setShowView(false)} vendor={selectedVendor} />}
      {showOrder && <OrderModal onClose={() => setShowOrder(false)} vendor={selectedVendor} />}

      <header className="heading">
        <div className="texts">
          <h3>browse vendor</h3>
          Find and locate your vendors
        </div>
      </header>

      <div className="search-bar">
        <input
          placeholder="Search location"
          className="searchinput"
          value={findLocation}
          onChange={(e) => setFindloacation(e.target.value)}
        />
        <div className="search-drop">
          <span>
            Newest first <RxCaretDown />
          </span>
        </div>
      </div>

      <section className="views extreme">
        {filteredLocation.length === 0 && <p>No vendors available</p>}
        {filteredLocation.map((vendor) => (
          <div key={vendor.id} className="order-holder">
            <div className="my-order">
              <div className="vendor-status">
                <p>{vendor.businessName}</p>{" "}
                <span className="available">available</span>{" "}
                <span className="verified">
                  <MdVerified /> verified
                </span>
              </div>
              <div className="info">
                <small>
                  <GoStar className="star" /> {vendor.rating || 4.8}
                </small>
                <small>{vendor.distance || "2.1km"}</small>
                <small>
                  <TbCurrencyNaira className="the-currency" />
                  <span className="the-price">{vendor.pricePerKg || 1500}/kg</span>
                </small>
              </div>
              <p>
                <span>
                  <BiTimeFive />
                </span>
                <small>{vendor.operatingHours || "7:30AM - 8:30PM"}</small>
              </p>
              <small>Mon - Sun</small>
            </div>

            <div className="right">
              <button className="order-now" onClick={() => openOrderModal(vendor)}>
                order now
              </button>
              <button className="order-now to-view" onClick={() => openViewModal(vendor)}>
                view
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default BrowseVendor;
