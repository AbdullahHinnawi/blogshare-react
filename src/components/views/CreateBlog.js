import React, {Component} from "react";
import { Editor } from "@tinymce/tinymce-react";
import styled from 'styled-components';



class CreateBlog extends Component{
  render() {
    return(
        <Styles>

          <div id="create-blog" style={{marginTop:'100px'}}>

            <h2 className="custom-form mb-3">Create Blog</h2>
            <form className="custom-form">

              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title"
                       placeholder="Title" required/>
              </div>

              <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select id="category" name="category" ref="category">
                      <option>
                        Category
                      </option>
                  </select>
              </div>

              <div className="form-group textEditor">
                <label htmlFor="body"/>
                <Editor
                    initialValue={`<p>What is in your mind?</p>`}
                    init={{
                      height: 400,
                      menubar: false
                    }}
                />
               </div>

              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input type="file" id="image" name="imageFile"
                       accept="image/*" ref="imageFile"
                   required/>
              </div>

              <div className="form-group">
                <button type="submit" name="submit"
                        className="btn btn-primary">Create
                </button>
              </div>


            </form>

          </div>
        </Styles>


    );
  }

}
export default CreateBlog;

const Styles = styled.div`

    input, select{
   margin-left: 0.5rem;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 3px 7px;
    }
    input[type=file]{
    border: none !important;;
    }
    .textEditor{
        margin-top: -1.5rem;
        margin-bottom: 1.2rem;
        font-weight: normal !important;
    }
    /* style all input elements with a required attribute */
    input:required {
       /* box-shadow: 1px 1px 5px rgba(200, 0, 0, 0.85);*/
    }
    #create-blog{
        margin-bottom: 15rem;
        padding: 2rem;
    }

`;

