import React, { useContext } from "react";
import SectionContext from "../../context/SectionContext";
import "./Sidebar.css";
import logo from "/logo.png";
import { LogOut } from "lucide-react";

const Sidebar = ({ opened, toggle, setAuth }) => {
  const { selectedSectionIndex, selectSection, sections, icons } =
    useContext(SectionContext);

  return (
    <>
      {opened && (
        <div
          className="sidebar-under"
          onClick={() => {
            if (opened) toggle(false);
          }}
        ></div>
      )}
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
          <div
            className="sidebutton logout"
            onClick={() => {
              toggle(false);
              setAuth(false);
              localStorage.clear();
            }}
          >
            <LogOut />
            Logout
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
