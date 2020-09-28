import React, {Component} from "react";
import {
  Nav,
  Navbar,
} from "react-bootstrap";

import '../../css/NavigationBar.css';
//import "../node_modules/jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";

class NavigationBar extends Component{
  render() {
    return(
          <Navbar collapseOnSelect expand="lg" fixed="top">
            <Navbar.Brand href="/">BlogShare</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/all-blogs">Blogs</Nav.Link>
                <Nav.Link href="/create-blog">Create Blog</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>



    );
  }

}
export default NavigationBar;