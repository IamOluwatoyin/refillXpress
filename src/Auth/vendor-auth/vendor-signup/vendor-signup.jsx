import React, { useState } from "react";
import "./vendor-signup.css";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoFlag } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const vendorsignup = () => {
  return (
    <div className="form-wrapper">
      <div className="form-container">
        <header>
          <img src="/Images/Vector.jpg" alt="logo"className="image" />

          <h1>
            Refill<span>Xpress</span>
          </h1>
        </header>
        <section className="cardBodyWrapper">
          <main className="cardBody">
            <article>
              <h3>Sign Up as Vendor</h3>
              <p>
                Join our network of trusted gas refill vendors and connect with
                <br />
                thousands of customers in your area
              </p>
            </article>

            <h4>Business Information</h4>
            <section className="formWrapper">
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label> Business Name</label>
                  <input
                    placeholder=" Max gas"
                    type="text"
                    name="vendorName"
                    style={{
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #9b9191cc",
                      width: "30.9375rem",
                    }}
                  />
                </div>

                <div style={{ display: "flex", gap: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <label>Business Email</label>
                    <input
                      id="vendorEmail"
                      placeholder="Maxgas@gmail.com"
                      type="email"
                      name="vendorEmail"
                      style={{
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        width: " 18.875rem",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <label>Business Phone Number</label>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        width: "19rem",
                        overflow: "hidden",
                        paddingLeft: "8px",
                        background: "#fff",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1px",
                        }}
                      >
                        <IoFlag size={18} />
                        <RiArrowDropDownLine size={20} />
                      </div>

                      {/* Divider */}
                      <div
                        style={{
                          height: "30px",
                          width: "1px",
                          backgroundColor: "#000",
                          margin: " 0px 3px",
                        }}
                      ></div>

                      <span>+234</span>

                      <input
                        id="vendorPhoneno"
                        name="vendorPhoneno"
                        type="text"
                        placeholder="8012345678"
                        style={{
                          border: "none",
                          outline: "none",
                          padding: "8px 4px",
                          fontSize: "1rem",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label> Business Address</label>
                  <input
                    type="text"
                    name="vendorAddress"
                    style={{
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #9b9191cc",
                      width: "39.3125rem",
                    }}
                  />
                </div>

                <h4> Owner’s/manager Information</h4>
                <div style={{ display: "flex", gap: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <label>First Name</label>
                    <input
                      id="vendorFirstName"
                      type="text"
                      name="vendorFirstName"
                      style={{
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        width: " 18.875rem",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <label> Last Name</label>
                    <input
                      id="vendorLastName"
                      type="text"
                      name="vendorLastName"
                      style={{
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #9b9191cc",
                        width: " 18.875rem",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label> Input Your Password</label>
                  <div
                    style={{
                      padding: "8px 4px",
                      borderRadius: "4px",
                      border: "1px solid #9b9191cc",
                      width: "39.3125rem",

                      background: "#FFF",
                    }}
                  >
                    <input
                      placeholder=" Password ( 8 or more characters)"
                      type="password"
                      name="vendorName"
                      style={{
                        border: "none",
                        outline: "none",

                        width: "35rem",
                      }}
                    />
                    <FaRegEye />
                    <FaRegEyeSlash />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label> Comfirm Password</label>
                  <div
                    style={{
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #9b9191cc",
                      background: "#fff",
                      width: "39.3125rem",
                    }}
                  >
                    <input
                      placeholder="  Enter your same password here"
                      type="password"
                      name="vendorName"
                      style={{
                        outline: "none",
                        border: "none",
                        width: "35rem",
                      }}
                    />
                    <FaRegEye />
                    <FaRegEyeSlash />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "3px" }}>
                  <MdCheckBoxOutlineBlank />
                  <span>
                    {" "}
                    I agree to Refillxpress{" "}
                    <a
                      href="#"
                      style={{ textDecoration: "none", color: "#1BB970" }}
                    >
                      terms and conditions
                    </a>
                  </span>
                </div>
                <button
                  style={{
                    padding: "8px 10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    background: "#FF7F11",
                    border: "none",
                    width: "39.3125rem",
                  }}
                >
                  Create Account
                </button>
                <div
                  style={{
                    display: "flex",
                    gap: "3px",
                    justifyContent: "center",
                  }}
                >
                  <span>Already have an account?</span>
                  <a
                    href="#"
                    style={{ textDecoration: "none", color: "#1BB970" }}
                  >
                    Signin{" "}
                  </a>
                </div>
              </form>
            </section>
          </main>
        </section>
      </div>
    </div>
  );
};

export default vendorsignup;

//
