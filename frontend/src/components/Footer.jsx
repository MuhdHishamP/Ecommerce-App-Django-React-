import React from "react";
import { Col, Row, Container } from "react-bootstrap";

function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copy &copy; EcShop </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
