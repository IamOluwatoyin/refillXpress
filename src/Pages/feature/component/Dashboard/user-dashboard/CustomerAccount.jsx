import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { toast } from "react-toastify";
 
import "./customeraccount.css"
import { getUserProfile } from "../../../../../api/query";

const CustomerAccount = () => {
  const [profileAccount, setProfileAccount] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    residentialAddress: "",
  });

  const fetchUserProfile = async () => {
    try {
      const res = await getUserProfile();
      const data = res?.data?.data;

      const fullName = `${data?.firstName || ""} ${data?.lastName || ""}`.trim();

      setProfileAccount({
        fullName,
        email: data?.email || "",
        phoneNumber: data?.phoneNumber || "",
        residentialAddress: data?.address || "",
      });

      console.log("profile fetched", data);
    } catch (err) {
      console.error("not seeing profile", err);
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <main className="customer-account">
      <header className="heading">
        <div className="texts">
          <h3>account</h3>
          <span>Manage your profile</span>
        </div>
      </header>

      <section className="views extreme">
        <div className="top">
          <p className="preview-title">personal information</p>
        </div>

        {/* Profile picture section */}
        <article className="upload">
          <div className="profile-box">
            <input type="file" id="pic" />
          </div>
          <div>
            <p>profile picture</p>
            <span>Upload a professional photo of yourself</span>
          </div>
          <label htmlFor="pic">
            <p className="green-circle">
              <MdOutlineEdit />
            </p>
          </label>
        </article>

        {/* First row of inputs */}
        <section className="inputs">
          <div className="div-input">
            <label htmlFor="fullName">full name</label>
            <input
              type="text"
              id="fullName"
              value={profileAccount.fullName}
              onChange={(e) =>
                setProfileAccount({ ...profileAccount, fullName: e.target.value })
              }
            />
          </div>

          <div className="div-input">
            <label htmlFor="email">email address</label>
            <input
              type="text"
              id="email"
              value={profileAccount.email}
              disabled
            />
          </div>
        </section>

        {/* Second row of inputs */}
        <section className="inputs">
          <div className="div-input">
            <label htmlFor="phoneNumber">phone number</label>
            <input
              type="text"
              id="phoneNumber"
              value={profileAccount.phoneNumber}
              onChange={(e) =>
                setProfileAccount({
                  ...profileAccount,
                  phoneNumber: e.target.value,
                })
              }
            />
          </div>

          <div className="div-input">
            <label htmlFor="residentialAddress">residential address</label>
            <input
              type="text"
              id="residentialAddress"
              value={profileAccount.residentialAddress}
              onChange={(e) =>
                setProfileAccount({
                  ...profileAccount,
                  residentialAddress: e.target.value,
                })
              }
            />
          </div>
        </section>
      </section>

      {/* Saved addresses section */}
      <div className="views extreme">
        <div className="top">
          <p className="preview-title">
            <GrLocation className="nav-link" /> saved addresses
          </p>
        </div>

        <div className="order-holder">
          <div className="my-order">
            <p className="destination">home</p>
            <span className="address">No 1 sinzu street Ojodu</span>
          </div>
        </div>

        <div className="order-holder">
          <div className="my-order">
            <p className="destination">office</p>
            <span className="address">Bakare rd Ogba</span>
          </div>
        </div>

        <div className="order-holder">
          <div className="add-destination">
            <button className="addbutton">add new address</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CustomerAccount;
