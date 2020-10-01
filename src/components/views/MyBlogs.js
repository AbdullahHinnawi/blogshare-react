import React, {Component} from 'react';
import axios from 'axios';
import baseUrl from '../../baseUrl';
import taglogo from '../../assets/taglogo.png';
import styled from 'styled-components';



class MyBlogs extends Component{

  constructor(props){
    super(props);
    this.state = {
      blogs: null,
      currentBlogId: null,
      reveivedImage: null
    }
  }
  async componentDidMount() {
    const userId = '5df14f8898ee0448591ffc1d';
    const options = {
      headers: {
        Authorization: '',
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

  render() {
    const {blogs} = this.state;

    return (
        <Styles>

          (
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
                        <b>{blog.category.toUpperCase()}</b></p>
                      <p className="blog-author">By <b>{blog.author}</b></p>
                      <p className="blog-date">On {blog.date}</p>
                      <div className="embed-responsive embed-responsive-4by3">
                        <img className="card-img-top embed-responsive-item"
                             src={`${baseUrl}/api/image/` + blog.imageFile}
                             alt="blogImage"/>
                      </div>
                      <p className="blog-body">{blog.body}</p>

                      <div className="d-flex editDeleteDiv">
                        <span><button type="button" tag="button" className=" card-link btn btn-primary">Edit</button></span>
                      <a className="card-link btn btn-danger ml-4" href="#">Delete</a>

                    </div>

                    </div>

                  </div>))}


            </div>}

            {!blogs && <div className="ml-2"
                            style={{maxWidth: "35rem", marginBottom: "30rem"}}>
              <div className="alert alert-info">No Blogs Found.</div>
            </div>}


          </div>
          )
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

