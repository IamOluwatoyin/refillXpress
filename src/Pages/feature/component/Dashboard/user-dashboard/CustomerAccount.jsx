import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { toast } from "react-toastify";
import "./customeraccount.css";
import { getUserProfile } from "../../../../../api/query";
import { userProfileUpdate } from "../../../../../api/mutation";
import { FiUser } from "react-icons/fi";


const CustomerAccount = () => {
  const [profileAccount, setProfileAccount] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    residentialAddress: "",
    profilePicture: "",
  });

  const [loading, setLoading] = useState(false);

 
  const fetchUserProfile = async () => {
    try {
      const res = await getUserProfile();
      const userData = res?.data?.data;

      const fullName = `${userData?.firstName || ""} ${userData?.lastName || ""}`.trim();

      setProfileAccount({
        fullName,
        email: userData?.email || "",
        phoneNumber: userData?.phoneNumber || "",
        residentialAddress: userData?.residentialAddress || "",
        profilePicture: userData?.profilePicture || "",
         homeAddress: userData?.home || "",     
        officeAddress: userData?.office || "",
      });

      //  Sync with localStorage for dashboard use
      const storedUser = JSON.parse(localStorage.getItem("userInfo")) || {};
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          ...storedUser,
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          email: userData?.email,
          role: userData?.role,
          profilePicture: userData?.profilePicture,
          residentialAddress: userData?.residentialAddress || "",
          homeAddress: userData?.home || "",   
          officeAddress: userData?.office || "",   
        })
      );

      console.log("Profile fetched successfully", userData);
    } catch (err) {
      console.error("Profile fetch failed:", err);
      toast.error(err?.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileAccount({ ...profileAccount, profilePicture: file });
    }
  };

  
  const updateProfile = async () => {
  try {
    const formData = new FormData();

    if (profileAccount.profilePicture instanceof File) {
      formData.append("profilePicture", profileAccount.profilePicture);
    }

    formData.append("residentialAddress", profileAccount.residentialAddress || "");
    formData.append("home", profileAccount.homeAddress || "");
    formData.append("office", profileAccount.officeAddress || "");

    await userProfileUpdate(formData);
    toast.success("Profile updated successfully!");
    fetchUserProfile();
  } catch (error) {
    console.error("Update failed", error);
    toast.error(error.response?.data?.message || "Something went wrong updating profile");
  }
};


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
           {profileAccount.profilePicture ? (
  <img
    src={profileAccount.profilePicture}
    alt="Profile"
    className="profile-image"
  />
) : (
  <div className="profile-image placeholder">
    <FiUser size={40} color="#9ca3af" />
  </div>
)}
            <input
              type="file"
              id="pic"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          <div>
            <p>profile picture</p>
            <span>Upload a professional photo of yourself</span>
          </div>
          <label htmlFor="pic" style={{ cursor: "pointer" }}>
            <p className="green-circle">
              <MdOutlineEdit />
            </p>
          </label>
        </article>

        {/* Editable fields */}
        <section className="inputs">
          <div className="div-input">
            <label htmlFor="fullName">full name</label>
            <input
              type="text"
              id="fullName"
              value={profileAccount.fullName}
              onChange={(e) =>
                setProfileAccount({
                  ...profileAccount,
                  fullName: e.target.value,
                })
              }
            />
          </div>

          <div className="div-input">
            <label htmlFor="email">email address</label>
            <input type="text" id="email" value={profileAccount.email} disabled />
          </div>
        </section>

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

        <div className="save-button">
          <button className="addbutton" onClick={updateProfile}>
            Save Changes
          </button>
        </div>
      </section>

      {/* Saved addresses */}
      <div className="views extreme">
        <div className="top">
          <p className="preview-title">
            <GrLocation className="nav-link" /> saved addresses
          </p>
        </div>

        <div className="order-holder saved-address">
          <div className="my-order fullwidth-address">
            <label htmlFor="homeAddress" className="address-label">
              Home
            </label>
            <input
              type="text"
              id="homeAddress"
              className="address-full-input"
              placeholder="Enter home address"
              value={profileAccount.homeAddress || ""}
              onChange={(e) =>
                setProfileAccount({
                  ...profileAccount,
                  homeAddress: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="order-holder saved-address">
          <div className="my-order fullwidth-address">
            <label htmlFor="officeAddress" className="address-label">
              Office
            </label>
            <input
              type="text"
              id="officeAddress"
              className="address-full-input"
              placeholder="Enter office address"
              value={profileAccount.officeAddress || ""}
              onChange={(e) =>
                setProfileAccount({
                  ...profileAccount,
                  officeAddress: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="order-holder">
          <button
            className="addbutton"
            onClick={updateProfile}
            disabled={loading}
          >
            {loading ? "Updating..." : "Add Address"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default CustomerAccount;
