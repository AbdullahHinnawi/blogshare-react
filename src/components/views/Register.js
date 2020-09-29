import React from "react";
import styled from "styled-components";


const Register = () => {

    return(
        <Styles>
          <div style={{marginTop:'50px'}} className="register">
            <h2 className="custom-form">Register</h2>
            <form className="custom-form">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text"
                       className="form-control" id="firstName" name="firstName"
                       placeholder="First Name"/>
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text"
                       className="form-control" id="lastName" name="lastName"
                       placeholder="Last Name"/>
              </div>

              <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text"
                     className="form-control" id="username" name="userName"
                     placeholder="Username"/>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password"
                       className="form-control" id="password" name="password"
                       placeholder="Password"/>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password"
                       className="form-control" id="confirmPassword" name="confirmPassword"
                       placeholder="Confirm Password"/>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>


            </form>

          </div>
        </Styles>

    );


};
export default Register;

const Styles = styled.div`
    .register{
        margin-bottom: 20rem;
        padding: 2rem;
    }

`;