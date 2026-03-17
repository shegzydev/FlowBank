import React, { useContext } from "react";
import SectionContext from "../../context/SectionContext";
import "./Sidebar.css";
import logo from "/logo.png";

const Sidebar = ({ opened, toggle }) => {
  const { selectedSectionIndex, selectSection, sections, icons } =
    useContext(SectionContext);

  return (
    <div className={`sidebar-container ${!opened && "close"}`}>
      <div className="title">
        <img src={logo} className="bank-logo" /> Flow Bank
      </div>
      <hr></hr>
      <div className="sidebuttons">
        {sections.map((entry, index) => (
          <div
            className={`sidebutton ${index == selectedSectionIndex && "chosen"}`}
            onClick={() => {
              selectSection(index);
              toggle(false);
            }}
          >
            {icons[index]}
            {entry}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
