import React, { useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { vendorUploadPic, vendorUpadeDetails } from "../../../../api/mutation";
import { toast } from "react-toastify";
import { useRefetch } from "../../../../api/refetch";
import { getVendorKyc } from "../../../../api/query";
const BusinessInformation = ({ vendor }) => {
  const [formData, setFormData] = useState({
    phoneNumber: vendor?.businessPhoneNumber || "",
    residentialAddress: vendor?.residentialAddress || "",
  });
const {refetch} = useRefetch(getVendorKyc)
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    if (!file) return;

    const uploadData = new FormData();

    uploadData.append("vendorImage", file);

    try {
      setUploading(true);
      const res = await vendorUploadPic(uploadData);
      const updated = res?.data?.data;

      const storedVendor =
        JSON.parse(localStorage.getItem("vendor_token")) || {};
      localStorage.setItem(
        "vendor_token",
        JSON.stringify({
          ...storedVendor,
          vendorImage: updated?.vendorImage,
        })
      );

      toast.success("Profile picture updated successfully!");
      refetch()
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error(
        error?.response?.data?.message || "Failed to upload profile picture"
      );
    } finally {
      setUploading(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setSaving(true);
      const payload = {
        phoneNumber: formData.phoneNumber,
        residentialAddress: formData.residentialAddress,
      };

      const res = await vendorUpadeDetails(payload);
      const updated = res?.data?.data;

      const storedVendor =
        JSON.parse(localStorage.getItem("vendor_token")) || {};
      localStorage.setItem(
        "vendor_token",
        JSON.stringify({
          ...storedVendor,
          businessPhoneNumber: updated?.businessPhoneNumber,
          residentialAddress: updated?.residentialAddress,
        })
      );

      toast.success("Profile information updated successfully!");
       refetch()
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update information"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profileCard">
      <div className="profileHeader">
        <h4>Personal Information</h4>
      </div>

      {/* Profile Picture Upload Section */}
      <div className="profilePicSection">
        <div className="profileImageWrapper">
          {vendor?.vendorImage ? (
            <img
              src={vendor?.vendorImage}
              alt="Profile"
              className="profileImagePlaceholder"
            />
          ) : (
            <div className="profileImagePlaceholder"></div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p>Profile Picture</p>
          <span>Upload a professional photo of yourself</span>
          <label htmlFor="profileUpload" className="uploadBtn">
            <MdOutlineFileUpload style={{ fontSize: "16px" }} />
            {uploading ? "Uploading..." : "Upload Photo"}
          </label>
          <input
            type="file"
            id="profileUpload"
            accept="image/*"
            onChange={handleImageSelect}
            style={{ display: "none" }}
            disabled={uploading}
          />
        </div>
      </div>

      {/* Personal Info */}
      <div className="formGrid">
        <div className="formRow">
          <div className="formGroup">
            <label>Full Name</label>
            <input
              type="text"
              value={`${vendor?.firstName || ""} ${vendor?.lastName || ""}`}
              readOnly
            />
          </div>

          <div className="formGroup">
            <label>Email Address</label>
            <input
              type="email"
              value={vendor?.businessEmail || ""}
              readOnly
              className="faint-input"
            />
          </div>
        </div>

        <div className="formRow">
          <div className="formGroup">
            <label>Phone Number</label>
            <input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
            />
          </div>

          <div className="formGroup">
            <label>Residential Address</label>
            <input
              type="text"
              value={formData.residentialAddress}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  residentialAddress: e.target.value,
                }))
              }
            />
          </div>
        </div>
      </div>

      <div className="saveSection">
        <button
          className="saveBtn"
          onClick={handleSaveChanges}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default BusinessInformation;
