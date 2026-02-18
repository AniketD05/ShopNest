import React from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let username = "";

  if (token) {
    const decoded = jwtDecode(token);
    username = decoded.sub; // because we stored username using setSubject()
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.navbar}>
      <h3>ShopNest</h3>

      <div>
        <span style={{ marginRight: "15px" }}>
          Welcome, {username}
        </span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#222",
    color: "white"
  }
};

export default Navbar;
