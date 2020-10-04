import React, {Component, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import baseUrl from '../../baseUrl';
import * as auth from '../../services/authService';
import { useHistory } from "react-router-dom";

const AddCategory = () =>{


  const [category, setCategory] = useState('');

  const history = useHistory();

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [alertError, setAlertError] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [message, setMessage] = useState(false);


  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const categoryError = () => {
    return category === '' || !category.match(/(?=^.{3,}$)[a-zA-Z ]*$/);
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if(categoryError()){
      setError(true);
      setSuccess(false);
    }else {
      let newCategory = {name: category};

      console.log("NEW category : ", newCategory);
       await axios.post(baseUrl+'/api/categories/add', newCategory,{
         headers:{
           Authorization: auth.getToken()
         }
       }).then(async res => {
        console.log("#### adding category response ", res.data);
        setSubmitted(false);
        setError(false);
        setSuccess(true);
        setCategory('');
        setMessage(res.data.message);
        if(res.data.message === "Category Saved Successfully!"){
          setAlertSuccess(true);
          setAlertError(false);
          history.push('/create-blog');

        }else if(res.data.message === "The Allowed Number Of categories Is 10"){
          setAlertSuccess(false);
          setAlertError(true);
        }else{
          setAlertSuccess(false);
          setAlertError(true);
        }

      }).catch(err => {
        console.log("Error: ", err);
      });
    }

  };
  return(

      <Styles>
        <div style={{marginTop:'50px'}} className="category">
          <h2 className="custom-form">Add Category</h2>
          <form className="custom-form" onSubmit={onSubmit}>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input type="text"
                     className="form-control" id="username" name="category"
                     placeholder="Category"
                     value={category}
                     onChange={handleCategoryChange}
              />
              <span className="errorMessage">
                  {submitted && categoryError() ? 'Category must be at least 3 characters' : ''}

                </span>

            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Add Category
              </button>
            </div>


            {/*<!--ALERT-->*/}
            <div>
              {alertError && <div
                  style={{maxWidth: "35rem", marginBottom: "30rem", fontWeight: "normal"}}>
                <div className="alert alert-danger"> {message}</div>
              </div>}

              {alertSuccess && <div
                  style={{maxWidth: "35rem", marginBottom: "30rem", fontWeight: "normal"}}>
                <div className="alert alert-success"> {message}</div>
              </div>}


            </div>





          </form>

        </div>
      </Styles>

  );


};
export default AddCategory;

const Styles = styled.div`
    .category{
        margin-bottom: 40rem;
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