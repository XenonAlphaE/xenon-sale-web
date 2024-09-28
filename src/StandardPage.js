// src/components/StandardPage.jsx

import React from 'react';
import { Navbar, Nav, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const StandardPage = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Your App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Page Content */}
      <Container className="mt-4">
        <h1>Welcome to Your App</h1>

        {/* Cards */}
        <Row className="mt-4">
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Card 1</Card.Title>
                <Card.Text>This is a simple card example.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Card 2</Card.Title>
                <Card.Text>Another card example with some text.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Card 3</Card.Title>
                <Card.Text>More content for the third card.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Additional text */}
        <p className="mt-4">Some additional text on the page.</p>
      </Container>
    </div>
  );
};

export default StandardPage;
