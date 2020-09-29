import React from "react";
import styled from "styled-components";


const Login = () =>{

    return(

        <Styles>
          <div style={{marginTop:'50px'}} className="login">
            <h2 className="custom-form">Log In</h2>
            <form className="custom-form">

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text"
                       className="form-control" id="username" name="username"
                       placeholder="Username"/>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password"
                       className="form-control" id="password" name="password"
                       placeholder="Password"/>
              </div>


              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Log In
                </button>
              </div>


            </form>

          </div>
        </Styles>

    );


};
export default Login;

const Styles = styled.div`
    .login{
        margin-bottom: 20rem;
        padding: 2rem;
    }

`;