import React, { useContext } from "react";
import "./Profile.css";
import UserContext from "../../context/UserContext";

const Profile = () => {
  const { user } = useContext(UserContext);

  function formatKey(key) {
    return key
      .replace(/([A-Z])/g, " $1") // insert space before capitals
      .replace(/^./, (str) => str.toUpperCase()); // capitalize first letter
  }

  return (
    <div className="profile-container">
      <div className="bio-section">
        <div className="profile-icon"></div>
        <div className="user-bio">
          <p className="user-name">{user.name}</p>
          <p className="user-email">{user.email}</p>
        </div>
      </div>
      <hr />
      <div className="profile-details-section">
        {Object.entries(user.other).map(([key, value]) => (
          <>
            <div className="profile-details-entry">
              <div className="detail">{formatKey(key)}</div>
              <div>{value}</div>
            </div>
            <hr />
          </>
        ))}
      </div>
    </div>
  );
};

export default Profile;
