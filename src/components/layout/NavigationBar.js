import React, {Component} from "react";
import {
  Nav,
  Navbar,
} from "react-bootstrap";

//import PropTypes from "prop-types";

import '../../css/navigationBar.css';
//import "../node_modules/jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";
import logo from '../../assets/1.png';

class  NavigationBar extends Component{
  /*
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  */

  render(){
   // const { match, location, history } = this.props;
  return (
      <Navbar className="navBar navbar-dark" collapseOnSelect expand="md"
              fixed="top" style={{fontWeight: "550"}}>
        <Navbar.Brand href="/">
          <img src={logo} style={{height: "40px", marginLeft: "-10px"}}
               alt={logo}/>
        </Navbar.Brand>
        <Navbar.Toggle className="navbar-toggler"
                       aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse className="navbarCollapse" id="responsive-navbar-nav">
          <Nav className="ml-auto" activeKey={window.location.pathname}>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/all-blogs">Blogs</Nav.Link>
            <Nav.Link href="/my-blogs">My Blogs</Nav.Link>
            <Nav.Link href="/create-blog">Create Blog</Nav.Link>
            <Nav.Link href="/add-category">Add Category</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

  );
}

}
export default NavigationBar;