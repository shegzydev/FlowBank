import React from "react";
import "./Dashboard.css";
import SectionContext from "../../context/SectionContext";
import { useContext } from "react";
import { Menu } from "lucide-react";
import UserContext from "../../context/UserContext";

const Dashboard = ({ toggleSidebar, sidebarOpened }) => {
  const { selectedSectionIndex, sections, pages } = useContext(SectionContext);
  const { user } = useContext(UserContext);

  return (
    <div className="dash-container">
      <div className="top-section">
        <div className="dash-title">
          <Menu
            className="hamburger"
            onClick={() => {
              if (!sidebarOpened) toggleSidebar(true);
            }}
          />
          <span className="header">{sections[selectedSectionIndex]}</span>
        </div>
        <div className="mini-profile">
          <div className="dash-name">{user.name}</div>
          <div className="dash-icon">
            {user.name
              .toUpperCase()
              .split(" ")
              .map((x) => x[0])}
          </div>
        </div>
      </div>
      <div className="main-section">{pages[selectedSectionIndex]}</div>
    </div>
  );
};

export default Dashboard;
