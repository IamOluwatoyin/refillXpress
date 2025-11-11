import React from "react";
import styled from "styled-components";
import DashboardHeader from "../static/Dashboard_Header";
import Dashboard_Sidebar from "../static/Dashboard_Sidebar";
import { Outlet } from "react-router";

const Dashboard_layout = () => {
  return (
    <LayoutContainer>
      <DashboardHeader />

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
  width: 300px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  flex-shrink: 0;
  overflow-y: auto;
  transition: all 0.3s ease;

  @media (max-width: 1024px) {
    width: 200px;
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
