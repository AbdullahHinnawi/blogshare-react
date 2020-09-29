import React, {useState} from 'react';
import styled from "styled-components";
import axios from 'axios';
import baseUrl from '../../baseUrl';


const Login = () =>{

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const usernameError = () => {
    return username === '';
  };
  const passwordError = () => {
    return password === '';
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (usernameError() || passwordError()) {
      setError(true);
      setSuccess(false);
    } else {
      const loginRequest = {
        username: username,
        password: password,

      };

      setUsername('');
      setPassword('');

      console.log("NEW loginRequest : ", loginRequest);
      const url = baseUrl + '/api/users/' + loginRequest.username;
      await axios.post(url, loginRequest).then(async res => {
        console.log("#### loginRequest response ", res.data.message);
        setError(false);
        setSuccess(true);
        setSubmitted(false);

      }).catch(err => {
        console.log("Error: ", err);
      });
    }

  };

    return(

        <Styles>
          <div style={{marginTop:'50px'}} className="login">
            <h2 className="custom-form">Log In</h2>
            <form className="custom-form" onSubmit={onSubmit}>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text"
                       className="form-control" id="username" name="username"
                       placeholder="Username"
                       value={username}
                       onChange={handleUsernameChange}
                />
                <span className="errorMessage">
                  {submitted && usernameError() ? 'Username is required' : ''}

                </span>

              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password"
                       className="form-control" id="password" name="password"
                       placeholder="Password"
                       value={password}
                       onChange={handlePasswordChange}
                />
                <span className="errorMessage">
                  {submitted && passwordError() ? 'Password is required' : ''}

                </span>

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
        .errorMessage {
        color: red;
        font-size: 0.85em;
        font-weight: normal;
    }
    .error{
    border: 1px solid #eb516d;
    }

`;