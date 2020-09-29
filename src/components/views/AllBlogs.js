import React, {Component} from "react";
import axios from 'axios';
import baseUrl from '../../baseUrl';
import taglogo from '../../assets/taglogo.png';
import styled from 'styled-components';




class AllBlogs extends Component{
  constructor(props){
    super(props);
    this.state = {
      blogs: null,
      currentBlogId: null,
      reveivedImage: null
    }
  }
  async componentDidMount() {
    try{
      const res =  await axios.get(baseUrl+'/api/blogs?limit=10',{
        headers:{
          Authorization: '',
        }
      });
      //const data =  res.data;
      window.console.log('res', res);
      window.console.log('res.data.blogs', res.data.blogs);
      // save received blogs to an array
      const array = res.data.blogs;
      window.console.log('array', array);
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

    return(
      <Styles>

        (<div  id="all-blogs" className="d-flex flex-column justify-content-center" style={{marginTop:'50px'}}>
          <h2 className="custom-header">All Blogs</h2>

          {blogs && blogs.length > 0 && <div className="d-flex flex-wrap justify-content-center">

           {this.state.blogs.map((blog, index) => ( <div key={index} className="card mb-2 ml-2 p-4" style={{width: "32rem"}}>
              <div className="card-in">
                <h2>{blog.title}</h2>
                <p><img className="taglogo" src={taglogo} alt="tag logo"/> <b>{blog.category.toUpperCase()}</b></p>
                <p className="blog-author">By <b>{blog.author}</b></p>
                <p className="blog-date">On {blog.date}</p>
                <div className="embed-responsive embed-responsive-4by3">
                  <img className="card-img-top embed-responsive-item"
                       src={`${baseUrl}/api/image/`+blog.imageFile}
                       alt="image"/>
                </div>
                <p className="blog-body">{blog.body}</p>

                <div>
                  <button className="btn btn-primary readMoreBtn" >Read More...</button>
              </div>

              </div>

            </div>))}



          </div>}

          { blogs && blogs.length === 0 && <div className="ml-2"
               style={{maxWidth: "35rem",marginBottom: "30rem"}}>
            <div className="alert alert-info">No Blogs Found.</div>
          </div>}


        </div>)
      </Styles>
    );
  }

}
export default AllBlogs;


const Styles = styled.div`

     .taglogo{
      width: 18px;
      height: 18px;
    }
    .blog-author, .blog-date{
      line-height: 7px;
      color: #262626;
    }
    .blog-body{
      margin-top: 1rem;
      margin-bottom: 3.5rem;
      text-align: justify;
    }
    .readMoreBtn{
      /*  margin-bottom: 0.3rem !important;*/
      position: absolute;
      bottom: 1.5rem;
    }
    #all-blogs{
      margin-bottom: 10rem;
      padding: 2rem;
    }
`;