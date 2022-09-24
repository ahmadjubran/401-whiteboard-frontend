import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col className="text-center py-3">© 2022 Whiteboard</Col>
        </Row>
      </Container>
    </div>
  );
}
