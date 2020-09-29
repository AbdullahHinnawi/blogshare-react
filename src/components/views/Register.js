import React, {useState} from 'react';
import styled from "styled-components";
import axios from "axios";




const Register = () =>{
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };


  const firstNameError = () => {

    return firstName === '' || !firstName.match(/(?=^.{3,}$)[a-zA-Z ]*$/);
  };


  const lastNameError = () => {
    return lastName === '' || !lastName.match(/(?=^.{3,}$)[a-zA-Z ]*$/);
  };
  const usernameError = () => {
    return username === '' ||!username.match(/(?=^.{3,}$)[a-zA-Z0-9 ]*$/);
  };
  const passwordError = () => {
    return password === '' ||  !password.match(/(?=^.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/);
  };
  const confirmPasswordError = () => {
    return confirmPassword === '' || confirmPassword !== password;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if(firstNameError() || lastNameError() || usernameError() || passwordError() || confirmPasswordError()){
      setError(true);
      setSuccess(false);
    }else {
      // Password confirmation is only on the client side.
      // There is no need to send the password confirmation field with the user object to the server.
      const registerForm = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,

      };

      setFirstName('');
      setLastName('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');

      console.log("NEW registerForm object: ", registerForm);
      axios.post("", registerForm).then(res => {
        console.log("#### register user response ", res);
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
          <div style={{marginTop:'50px'}} className="register">
            <h2 className="custom-form">Register</h2>
            <form className="custom-form" onSubmit={onSubmit} >
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text"
                       className="form-control"
                       id="firstName" name="firstName"
                       placeholder="First Name"
                       value={firstName}
                       onChange={handleFirstNameChange}
                />
                <span className="errorMessage">
                  {submitted && firstNameError() ? 'Enter at least 3 characters"' : ''}

                </span>
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text"
                       className={`form-control`}
                       id="lastName" name="lastName"
                       placeholder="Last Name"
                       value={lastName}
                       onChange={handleLastNameChange}
                />
                <span className="errorMessage">
                    {submitted && lastNameError() ? 'Enter at least 3 characters' : ''}

                </span>

              </div>

              <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text"
                     className={`form-control`}
                     id="username" name="userName"
                     placeholder="Username"
                     value={username}
                     onChange={handleUsernameChange}

              />
                <span className="errorMessage">
                    {submitted && usernameError() ? 'Enter at least 3 characters or numbers' : ''}
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password"
                       className={`form-control`}
                       id="password" name="password"
                       placeholder="Password"
                       value={password}
                       onChange={handlePasswordChange}

                />
                <span className="errorMessage">
                    {submitted && passwordError() ? 'Password must contain at least one number, one uppercase and 6 characters' : ''}

                </span>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password"
                       className={`form-control`}
                       id="confirmPassword" name="confirmPassword"
                       placeholder="Confirm Password"
                       value={confirmPassword}
                       onChange={handleConfirmPasswordChange}

                />
                <span className="errorMessage">
                    {submitted && confirmPasswordError() ? 'Password do not match' : ''}
                </span>
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
    .errorMessage {
        color: red;
        font-size: 0.85em;
        font-weight: normal;
    }
    .error{
    border: 1px solid #eb516d;
    }

`;


