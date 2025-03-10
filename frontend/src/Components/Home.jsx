import React, { useState, useEffect } from "react";
import { Container, Navbar, Button, Nav, Alert, Row, Col, Card, Form } from "react-bootstrap";
import { FaSignOutAlt, FaMoon, FaSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TransactionTable from "./TransactionTable"; // Import TransactionTable
import TransactionGraph from "./TransactionGraph"; // Import Graph Component
import "../styles/Home.css"; // Custom styles

const FinanceHome = () => {
  const [loggingOut, setLoggingOut] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("userToken");
      sessionStorage.clear();
      navigate("/login");
    }, 1500);
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      {/* Navbar */}
      <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} expand="lg" className="px-3 py-2 shadow">
        <Navbar.Brand className="fw-bold">💰 Finance Manager</Navbar.Brand>
        <Nav className="ms-auto d-flex align-items-center">
          <Form.Check
            type="switch"
            id="dark-mode-toggle"
            label={darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            className="me-3"
            onChange={() => setDarkMode(!darkMode)}
            checked={darkMode}
          />
          <Button variant="danger" onClick={handleLogout} disabled={loggingOut}>
            <FaSignOutAlt /> {loggingOut ? "Logging Out..." : "Logout"}
          </Button>
        </Nav>
      </Navbar>

      {/* Logout Message */}
      {loggingOut && <Alert variant="warning" className="text-center mt-3 w-50 mx-auto">Logging out...</Alert>}

      {/* Main Content */}
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className={`p-4 shadow-sm ${darkMode ? "bg-dark text-white" : "bg-light"}`}>
              <h2 className="text-center text-primary">Welcome to Finance Manager</h2>
              <p className="text-center text-primary">
                Manage your expenses, track income, and analyze financial trends efficiently.
              </p>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          {/* Transaction Table */}
          <Col lg={7} className="mb-4">
            <Card className={`p-3 shadow-sm ${darkMode ? "bg-dark text-white" : "bg-light"}`}>
              <h4 className="text-center">💼 Transactions</h4>
              <TransactionTable />
            </Card>
          </Col>

          {/* Graph Section */}
          <Col lg={5} className="mb-4">
            <Card className={`p-3 shadow-sm ${darkMode ? "bg-dark text-white" : "bg-light"}`}>
              <h4 className="text-center">📊 Monthly Overview</h4>
              <TransactionGraph />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FinanceHome;
