import React, {Component, useState} from 'react';
import axios from 'axios';
import baseUrl from '../../baseUrl';
import taglogo from '../../assets/taglogo.png';
import styled from 'styled-components';
import Modal from "react-bootstrap/Modal";

import * as auth from '../../services/authService';
import Button from 'react-bootstrap/Button';


class MyBlogs extends Component{

  constructor(props){

    super(props);
    this.state = {
      blogs: null,
      currentBlogId: null,
      reveivedImage: null,
      showConfDial: false
    };
    this.handleClose= this.handleClose.bind(this);
    this.handleShow= this.handleShow.bind(this);

  }
  async componentDidMount() {
    const userId = auth.getUserId();
    const options = {
      headers: {
        Authorization: auth.getToken(),
      }
    };

    try{
      const res =  await axios.get(baseUrl+'/api/myblogs?userId='+userId,options);
      window.console.log('res', res);
      window.console.log('res.data.blogs', res.data.blogs);
      // save received blogs to an array
      const array = res.data.blogs;
      // make a reversed array
      const reversedArray = array.reverse();
      window.console.log('reversedArray', reversedArray);
      this.setState({blogs: reversedArray});
    }catch(err){
      window.console.log(err);
    }


  }
  handleClose(){
    this.setState({showConfDial: false});
  }
  handleShow(){
    this.setState({showConfDial: true});
  }
  async deleteBlog(){
    const hiddenDiv = document.getElementById('hiddenDiv');
    const blogId = hiddenDiv.getAttribute('data-value');
    console.log("blogId", blogId);
    const options = {
      headers:{
        Authorization: auth.getToken(),
      }
    };
    try{
      const res =  await axios.delete(baseUrl+'/api/myblogs?id='+blogId, options);
      window.console.log('data',res);
      //const index = this.blogs.findIndex(blog => blog._id === this.currentBlogId);
      //this.blogs.splice(index,1);
      window.location.reload();
    }catch(err){
      window.console.log(err);
    }
  }

  render() {
    const {blogs} = this.state;


    return (
        <Styles>


          <div id="my-blogs"
               className="d-flex flex-column justify-content-center"
               style={{marginTop: '50px'}}>
            <h2 className="custom-header">My Blogs</h2>

            {blogs && blogs.length > 0 &&
            <div className="d-flex flex-wrap justify-content-center">

              {blogs.map((blog, index) => (
                  <div key={index} className="card mb-2 ml-2 p-4"
                       style={{width: "32rem"}}>
                    <div className="card-in">
                      <h2>{blog.title}</h2>
                      <p><img className="taglogo" src={taglogo} alt="tag logo"/>
                        <b><a href={`/categories/show/${blog.category}`} style={{color:"#0d47a1"}}>{blog.category.toUpperCase()}</a></b></p>
                      <p className="blog-author">By <b>{blog.author}</b></p>
                      <p className="blog-date">On {blog.date}</p>
                      <div className="embed-responsive embed-responsive-4by3">
                        <img className="card-img-top embed-responsive-item"
                             src={`${baseUrl}/api/image/` + blog.imageFile}
                             alt="blogImage"/>
                      </div>
                      <p className="blog-body">{blog.body}</p>

                      {blog.authorId === auth.getUserId() && <div className="d-flex editDeleteDiv">
                        <span><button type="button" tag="button" className=" card-link btn btn-primary">Edit</button></span>
                        <button onClick={this.handleShow} className="card-link btn btn-danger ml-4">Delete</button>
                        <div id="hiddenDiv" data-value={blog._id} style={{display: "none"}}/>
                      </div>}

                    </div>

                  </div>))}


            </div>}

            <div>
              <Modal show={this.state.showConfDial} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure, you would like to delete this blog?</Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={this.handleClose}>
                    Close
                  </Button>
                  <Button variant="danger" onClick={this.deleteBlog}>
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>

            </div>

            {(!blogs || this.state.blogs.length === 0 || blogs === 0) && <div className="ml-2"
                            style={{maxWidth: "35rem", marginBottom: "35rem"}}>
              <div className="alert alert-info">No Blogs Found.</div>
            </div>}


          </div>

        </Styles>
    );

  }


}
export default MyBlogs;







const Styles = styled.div`
    .taglogo{
        width: 18px;
        height: 18px;
    }
    .blog-author, .blog-date{
        line-height: 7px;
        color: #262626;
    }
    .btn-danger:hover{
        background-color: darkred  !important;
    }
    .btn-secondary:hover{
        background-color: #3E4551  !important;
    }
    .blog-body{
        margin-top: 1rem;
        margin-bottom: 3.5rem;
        text-align: justify;
    }
    .editDeleteDiv{
        /*  margin-bottom: 0.3rem !important;*/
        position: absolute;
        bottom: 1.5rem;
    }
    #my-blogs{
        margin-bottom: 10rem;
        padding: 2rem;
    }
`;

