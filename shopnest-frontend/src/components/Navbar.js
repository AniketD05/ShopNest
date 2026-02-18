import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Spinner, Navbar, Container, Form, Button, Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import "./Navbar.css";

function AppNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [locationName, setLocationName] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  let username = "";
  if (token) {
    const decoded = jwtDecode(token);
    username = decoded.sub;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const placeholders = [
  "Search for products...",
  "Search for mobiles...",
  "Search for groceries...",
  "Search for laptops...",
  "Search for fashion..."
];

const [placeholderIndex, setPlaceholderIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setPlaceholderIndex((prevIndex) =>
      prevIndex === placeholders.length - 1 ? 0 : prevIndex + 1
    );
  }, 2500); // change every 2.5 seconds

  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const data = await response.json();
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "Your Area";

          setLocationName(city);
          setLoadingLocation(false);
        },
        () => {
          setLocationName("Location unavailable");
          setLoadingLocation(false);
        }
      );
    }
  }, []);

  return (
    <Navbar bg="light" className="shadow-sm">
      <Container fluid className="custom-navbar">

        {/* Logo */}
        <div className="nav-item logo-item" onClick={() => navigate("/home")}>
          ShopNest
        </div>

        {/* Location */}
        <div className="nav-item location-box">
          <div className="location-label">Delivering to</div>
          <div className="location-city">
            📍{" "}
            {loadingLocation ? (
              <Spinner animation="border" size="sm" />
            ) : (
              locationName
            )}
          </div>
        </div>

        {/* Search */}
        <div className="nav-item search-item">
          <Form.Control
            type="search"
             placeholder={placeholders[placeholderIndex]}
          />
        </div>

        {/* Cart */}
        <div className="nav-item">
          <Button
            variant="outline-primary"
            className="d-flex align-items-center gap-2 position-relative"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart size={18} />
            My Cart
            <Badge
              bg="danger"
              pill
              className="position-absolute"
              style={{ top: "-6px", right: "-8px", fontSize: "9px" }}
            >
              0
            </Badge>
          </Button>
        </div>

        {/* Welcome */}
        {token && (
          <div className="nav-item welcome-item">
            Hello, {username}
          </div>
        )}

        {/* Logout */}
        {token && (
          <div className="nav-item">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        )}

      </Container>
    </Navbar>
  );
}

export default AppNavbar;
