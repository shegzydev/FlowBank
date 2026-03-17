import React from "react";
import "./Dashboard.css";
import SectionContext from "../../context/SectionContext";
import { useContext } from "react";
import { Menu } from "lucide-react";

const Dashboard = ({ toggleSidebar }) => {
  const { selectedSectionIndex, sections, pages } = useContext(SectionContext);

  return (
    <div className="dash-container">
      <div className="top-section">
        <div className="dash-title">
          <Menu className="hamburger" onClick={() => toggleSidebar(true)} />
          <span className="header">{sections[selectedSectionIndex]}</span>
        </div>
        <div className="mini-profile">
          <div className="dash-name">Olu-Abe Segun</div>
          <div className="dash-icon">OS</div>
        </div>
      </div>
      <div className="main-section">{pages[selectedSectionIndex]}</div>
    </div>
  );
};

export default Dashboard;
