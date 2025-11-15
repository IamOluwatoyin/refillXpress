import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DashboardHeader from "../static/Dashboard_Header";
import Dashboard_Sidebar from "../static/Dashboard_Sidebar";
import { Outlet } from "react-router";
import axios from "axios";

const fetchRiderData = async (riderId) => {
  if (!riderId) return null;

  const authToken = localStorage.getItem("authToken");
  const API_BASE_URL = import.meta.env.VITE_BASEURL;

  if (!authToken) {
    console.error("Auth Token not found in local storage.");
    return {
      name: "Unauthorized User",
      email: "check_login@example.com",
      role: "Error",
    };
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/rider/${riderId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("API Error fetching rider data:", error.response || error);

    let errorMessage = "Error User";
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }

    return { name: errorMessage, email: "error@example.com", role: "Rider" };
  }
};

const Dashboard_layout = () => {
  const [rider, setRider] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const riderId = localStorage.getItem("riderId");

    const loadRider = async () => {
      if (riderId) {
        const data = await fetchRiderData(riderId);
        if (data) {
          setRider(data);
        }
      } else {
        console.warn("Rider ID not found in local storage.");
      }
      setIsLoading(false);
    };

    loadRider();
  }, []);

  if (isLoading) {
    return (
      <LoadingContainer>
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </LoadingContainer>
    );
  }

  return (
    <LayoutContainer>
      <DashboardHeader rider={rider} />

      <MainContent>
        <SidebarWrapper>
          <Dashboard_Sidebar />
        </SidebarWrapper>

        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </MainContent>
    </LayoutContainer>
  );
};

export default Dashboard_layout;

const LayoutContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
`;

const MainContent = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SidebarWrapper = styled.aside`
  width: 350px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  flex-shrink: 0;
  overflow-y: auto;
  transition: all 0.3s ease;

  @media (max-width: 1024px) {
    width: 220px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ContentWrapper = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f9fafb;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const LoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #555;

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e5e7eb;
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 12px;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
