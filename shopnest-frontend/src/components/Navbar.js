import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Spinner, Navbar, Container, Form, Button } from "react-bootstrap";

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
    <Navbar bg="light" expand="lg" className="shadow-sm px-4">

      <Container fluid>

        {/* Left Section */}
        <Navbar.Brand
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer", fontWeight: "bold" }}
        >
          ShopNest
        </Navbar.Brand>

        {/* Location beside logo */}
        <div style={{ marginLeft: "15px", fontSize: "14px" }}>
          📍 Delivering to{" "}
          {loadingLocation ? (
            <Spinner animation="border" size="sm" />
          ) : (
            locationName
          )}
        </div>

        {/* Center Search */}
        <Form className="d-flex mx-auto" style={{ width: "40%" }}>
          <Form.Control
            type="search"
            placeholder="Search for products..."
            className="me-2"
          />
        </Form>

        {/* Right Section */}
        {token && (
          <div className="d-flex align-items-center gap-3">
            <span>Hello, {username}</span>
            <Button variant="outline-primary" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}

      </Container>
    </Navbar>
  );
}

export default AppNavbar;
