import React, {Component} from "react";
import styled from 'styled-components';


class Footer extends Component {

  render() {
    return (
      <Styles>
        <footer className="mainfooter" role="contentinfo">
              <div className="footer-middle">
                <div className="container">
                  <div className="row">

                    <div className="col-md-3 col-sm-6">

                      <div className="footer-pad">
                        <h4>BlogShare</h4>
                        <ul className="list-unstyled">
                          <li><a href="/">Home</a></li>
                          <li><a href="#">Features</a></li>
                          <li><a href="#">About us</a></li>
                          <li><a href="#">Ratings</a></li>
                          <li><a href="#">Contact us</a></li>
                        </ul>
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6">

                      <div className="footer-pad">
                        <h4>Info</h4>
                        <ul className="list-unstyled">
                          <li><a href="#"/></li>
                          <li><a href="#">Terms</a></li>
                          <li><a href="#">Privacy policy</a></li>
                          <li><a href="#">News and updates</a></li>
                          <li><a href="#">Team</a></li>
                          <li><a href="#">FAQs</a></li>
                        </ul>
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6">

                      <div className="footer-pad">
                        <h4>Links</h4>
                        <ul className="list-unstyled">
                          <li><a href="#">Accessibility</a></li>
                          <li><a href="#">Public Works</a></li>
                          <li><a href="#">Reporting</a></li>
                          <li><a href="#">Careers</a></li>
                          <li><a href="#"/></li>
                          <li>
                            <a href="#"/>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <h4>Follow Us</h4>
                      <ul className="social-network social-circle">
                        <li><a href="#" className="icoFacebook"
                               title="Facebook"><i
                            className="fa fa-facebook"/></a></li>
                        <li><a href="#" className="icoLinkedin"
                               title="Linkedin"><i
                            className="fa fa-linkedin"/></a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 copy">
                      <p className="text-center">&copy; Copyright 2020 -
                        BlogShare. All rights reserved.</p>
                    </div>
                  </div>


                </div>
              </div>
        </footer>
      </Styles>
    );
  }

}
export default Footer;


const Styles = styled.div`
    /*FOOTER*/
    footer {
        background: #16222A;
        color: white;
        margin-top:100px;
    }
    footer a {
        color: #fff;
        font-size: 14px;
        transition-duration: 0.2s;
    }
    footer a:hover {
        color: #0d47a1;
        text-decoration: none;
    }
    .copy {
        font-size: 12px;
        padding: 10px;
        margin-top: 16px;
        border-top: 1px solid #FFFFFF;
    }
    .footer-middle {
        padding-top: 2em;
        color: white;
    }
    /*SOCİAL İCONS*/
    /* footer social icons */
    ul.social-network {
        list-style: none;
        display: inline;
        margin-left: 0 !important;
        padding: 0;
    }
    ul.social-network li {
        display: inline;
        margin: 0 5px;
    }
    /* footer social icons */
    .social-network a.icoFacebook:hover {
        background-color: #3B5998;
    }
    .social-network a.icoLinkedin:hover {
        background-color: #007bb7;
    }
    .social-network a.icoFacebook:hover i,
    .social-network a.icoLinkedin:hover i {
        color: #fff;
    }
    .social-network a.socialIcon:hover,
    .socialHoverClass {
        color: #44BCDD;
    }
    .social-circle li a {
        display: inline-block;
        position: relative;
        margin: 0 auto 0 auto;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        border-radius: 50%;
        text-align: center;
        width: 30px;
        height: 30px;
        font-size: 15px;
    }
    .social-circle li i {
        margin: 0;
        line-height: 30px;
        text-align: center;
    }
    .social-circle li a:hover i,
    .triggeredHover {
        -moz-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -ms--transform: rotate(360deg);
        transform: rotate(360deg);
        -webkit-transition: all 0.2s;
        -moz-transition: all 0.2s;
        -o-transition: all 0.2s;
        -ms-transition: all 0.2s;
        transition: all 0.2s;
    }
    .social-circle i {
        color: #595959;
        -webkit-transition: all 0.8s;
        -moz-transition: all 0.8s;
        -o-transition: all 0.8s;
        -ms-transition: all 0.8s;
        transition: all 0.8s;
    }
    .social-network a {
        background-color: #F9F9F9;
    }

`;