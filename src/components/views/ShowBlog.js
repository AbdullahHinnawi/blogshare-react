import React, {Component} from 'react';
import axios from 'axios';
import baseUrl from '../../baseUrl';
import taglogo from '../../assets/taglogo.png';
import styled from 'styled-components';
import * as auth from '../../services/authService';
import * as params from 'gridfs-stream';
import * as blogService from '../../services/blogService';






class ShowBlog extends Component{

  constructor(props){
    super(props);
    this.state = {
      blog: null,
      comments: null,
      receivedImage: null,
      comment:{
        commentAuthor: '',
        body: '',
        commentDate: ''
      },
      BlogId: '',
      showComments: false

    }
  }
  async componentDidMount() {

    window.console.log("current blog id");
   // const currentBlogId = blogService.getBlogId();
    const pathname = this.props.location.pathname;
    window.console.log("this.props.location.pathname", pathname);

    try{
      const res =  await axios.get(baseUrl+'/api'+pathname,{
        headers:{
          Authorization: auth.getToken(),
        }
      });
      window.console.log('res', res);
      window.console.log('show blog res.data', res.data);
      const commentsArray = res.data.blog.comments;
      const reversedCommentsArray = commentsArray.reverse();
      this.setState({
        blog: res.data.blog,
        comments: reversedCommentsArray

      });
    }catch(err){
      window.console.log(err);
    }


  }
  render() {
    const {blog,comments,showComments } = this.state;

    return (
        <Styles>
          <div id="show-blog" className="d-flex flex-column justify-content-center" style={{marginTop: '50px'}}>
            <h2 className="custom-header">Show Blog</h2>
            {blog && <div className="d-flex flex-wrap justify-content-center">
                <div className="card mb-2 ml-2 p-4" style={{width: "50rem"}}>
                    <h2 className="blog-title">{blog.title}</h2>
                    <p className="blog-category"><img className="taglogo" src={taglogo} alt="tag logo"/>
                      <b>{blog.category.toUpperCase()}</b>
                    </p>
                    <p className="blog-author">By <b>{blog.author}</b></p>
                    <p className="blog-date">On {blog.date} </p>
                    <div className="embed-responsive embed-responsive-4by3">
                      <img className="card-img-top embed-responsive-item"
                           src={`${baseUrl}/api/image/` + blog.imageFile}
                           alt="image"/>
                    </div>
                    <p className="blog-body">{blog.body}</p>

                    <div>
                      <h4>Add Comment</h4>
                      <form>
                          <div className="form-group">

                            <textarea className="form-control commentBody" id="commentBody" type="text"  name="commentBody" placeholder="Input your comment"/>
                          </div>
                          <div className="form-group">
                            <button type="submit" name="submit" className="btn btn-primary commentBtn">Comment</button>
                          </div>
                      </form>
                    </div>
                    <p>
                      <a className="control"
                         onClick={() => {this.setState({showComments: !this.state.showComments})}}
                          href="#com-div"
                          ref="viewComments">View all comments
                      </a>
                    </p>
                    <div id="hide">
                      <h3>Comments</h3>
                      {comments && comments.length > 0 && <div className="card-footer">
                        <p className="comment-author"><b>comment author</b></p>
                        <p className="comment-date">comment date</p>
                        <p>comment body</p>
                      </div>}
                    </div>

                    {comments && comments.length === 0 && <div className="ml-2"
                       style={{maxWidth: "35rem"}}>
                        <div className="alert alert-info">
                          This blog has no comments yet!
                        </div>
                    </div>}
                </div>
            </div>}
          </div>
        </Styles>
    );

  }


}
export default ShowBlog;







const Styles = styled.div`
    .taglogo{
        width: 18px;
        height: 18px;
    }
    .blog-author{
        line-height: 7px;
        color: #2E2E2E;
    }
    .blog-date{
        line-height: 7px;
        color: #4B515D;
    }
    .blog-body{
        margin-top: 1rem;
        text-align: justify;
    }
    .commentBody{
        max-width: 30rem;
        margin-top: 0.7rem !important;
    }
    .commentBtn{
    }
    .comment-auhtor{
        line-height: 7px;
        color:  #4B515D;
        font-size: 1.1rem !important;
    }
    .comment-date{
        line-height: 7px;
        color:  #4B515D;
        font-size: 12px;
    }
    #show-blog{
        margin-bottom: 10rem;
        padding: 2rem;
    }
    @media screen and (max-width: 400px) {
    }

     
`;