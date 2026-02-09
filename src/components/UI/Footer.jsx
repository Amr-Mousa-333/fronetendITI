import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5 border-top border-info">
      <Container>
        <Row className="text-center text-md-start">
          <Col md={4} lg={4} xl={4} className="mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-info">Amr Mousa</h5>
            <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
              Engineer Amr Mousa Sayed Rashed. <br />
              Passionately building modern web applications with React and Redux. 
              Always striving for clean code and better user experiences.
            </p>
          </Col>
          <Col md={2} lg={2} xl={2} className="mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-info">Quick Links</h5>
            <p><NavLink to="/" className="text-white text-decoration-none hover-link">Home</NavLink></p>
            <p><NavLink to="/about" className="text-white text-decoration-none hover-link">About Us</NavLink></p>
            <p><NavLink to="/cart" className="text-white text-decoration-none hover-link">My Cart</NavLink></p>
          </Col>

          <Col md={4} lg={3} xl={3} className="mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-info">Contact</h5>
            <p style={{ fontSize: '14px' }}>📍 {new Date().getFullYear()} Fayoum, Egypt</p>
            <p style={{ fontSize: '14px' }}>📧 { "moamrmousa333@gmail.com" }</p>
            <p style={{ fontSize: '14px' }}>📞 +20 1100 386 004</p>
          </Col>
        </Row>

        <hr className="mb-4" />

        <Row className="align-items-center">
          <Col md={7} lg={8} className="text-center text-md-start">
            <p> © {new Date().getFullYear()} All rights reserved by: 
              <strong className="text-info"> Amr Mousa</strong>
            </p>
          </Col>

          <Col md={5} lg={4}>
            <div className="text-center text-md-end">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a href="https://www.facebook.com/share/1BoAJtfLBE/" target="_blank" rel="noreferrer" className="text-white mx-2 fs-5">Facebook</a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.linkedin.com/in/amormousa" target="_blank" rel="noreferrer" className="text-white mx-2 fs-5">LinkedIn</a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.instagram.com/engineer_3mor" target="_blank" rel="noreferrer" className="text-white mx-2 fs-5">Insta</a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.tiktok.com/@engineer_3mr" target="_blank" rel="noreferrer" className="text-white mx-2 fs-5">TikTok</a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;