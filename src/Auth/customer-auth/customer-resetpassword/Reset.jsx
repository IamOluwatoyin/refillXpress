import React, { useContext, useState } from "react";
import "./reset.css";
import "../customer-signup/signup.css";
import { HiFire } from "react-icons/hi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast } from "react-toastify";
import { BASEURL } from "../../../api/base";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router";
import axios from "axios";
import SpinnerModal from "../../vendor-auth/spinner-modal";


const Reset = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const nav = useNavigate();
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleRequest = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
    try {
      setLoading(true);
      const res = await axios.post(
        `${BASEURL}/user/resetpassword`,
        {
          email,
          newPassword: form.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("successful");
      nav("/userlogin");
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset">
      {loading && <SpinnerModal />}
      <article className="article">
        <header className="form-header">
          <div className="logo-heading">
            <img
              src="/Images/dashboard_logo.jpg"
              alt=""
              onClick={() => nav("/")}
              className="logo-heading"
            />
          </div>
        </header>
        <form className="form">
          <div className="form-heading wrap">
            <h1>reset password</h1>
            <p>
              Enter a new password for your account. Make sure it’s strong and
              easy for you to remember.
            </p>
          </div>
          <div className="input-container">
            <label htmlFor="email">password</label>
            <div className="input-div">
              <input
                type="text"
                placeholder="password (8 or more characters)"
                value={form.newPassword}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, newPassword: e.target.value }))
                }
              />
              <span className="eye">
                {show ? (
                  <BsEye onClick={() => setShow(false)} />
                ) : (
                  <BsEyeSlash onClick={() => setShow(true)} />
                )}
              </span>
            </div>
          </div>
          <div className="input-container">
            <label htmlFor="email">confirm password</label>
            <div className="input-div">
              <input
                type="text"
                placeholder="password (8 or more characters)"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
              />
              <span className="eye">
                {show ? (
                  <BsEye onClick={() => setShow(false)} />
                ) : (
                  <BsEyeSlash onClick={() => setShow(true)} />
                )}
              </span>
            </div>
          </div>
          <div className="submit-section">
            <button onClick={handleRequest} className="submit">
              reset password
            </button>
          </div>
        </form>
      </article>
    </div>
  );
};

export default Reset;
