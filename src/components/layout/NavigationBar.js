import React, {Component} from "react";
import {
  Nav,
  Navbar,
} from "react-bootstrap";

import '../../css/navigationBar.css';
//import "../node_modules/jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";

class NavigationBar extends Component{
  render() {
    return(
          <Navbar className="navBar" collapseOnSelect expand="md" fixed="top" >
            <Navbar.Brand href="/">BlogShare</Navbar.Brand>
            <Navbar.Toggle className="navbar-toggler" aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="navbarCollapse" id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link className="navLink" href="/">Home</Nav.Link>
                <Nav.Link className="navLink" href="/all-blogs">Blogs</Nav.Link>
                <Nav.Link className="navLink" href="/create-blog">Create Blog</Nav.Link>
                <Nav.Link className="navLink" href="/register">Register</Nav.Link>
                <Nav.Link className="navLink" href="/login">Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>



    );
  }

}
export default NavigationBar;