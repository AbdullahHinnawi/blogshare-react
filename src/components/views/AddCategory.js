import React, {Component, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';


const AddCategory = () =>{


  const [category, setCategory] = useState('');



  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);


  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const categoryError = () => {
    return category === '' || !category.match(/(?=^.{3,}$)[a-zA-Z ]*$/);
  };


  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if(categoryError()){
      setError(true);
      setSuccess(false);
    }else {

      setCategory('');

      console.log("NEW category : ", category);
      axios.post("", category).then(res => {
        console.log("#### adding category response ", res);
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


          </form>

        </div>
      </Styles>

  );


};
export default AddCategory;

const Styles = styled.div`
    .category{
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