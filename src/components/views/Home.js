import React, {Component} from "react";
import styled from 'styled-components';
import addcategory from '../../assets/addcategory.png';
import addcomment from '../../assets/addcomment.png';
import cappadociaBlog from '../../assets/cappadociaBlog.png';
import logo from '../../assets/1.png';
import logo4 from '../../assets/4.png';
import register from '../../assets/register.png';
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button';






class Home extends Component{

  render() {

      return(
        <Styles>

          <div  id="custom-home" style={{marginTop: '60px'}}>

            <Carousel className="carouselSlider">
              <Carousel.Item active>
                <svg className="bd-placeholder-img" width="100%" height="100%"
                     xmlns="http://www.w3.org/2000/svg"
                     preserveAspectRatio="xMidYMid slice" focusable="false"
                     role="img">
                  <rect className="rect1" width="100%" height="100%"
                  fill="#0d47a1"/>
                </svg>
                <div className="container carouselSlider">
                    <Carousel.Caption>
                      <img src={logo} alt="slideImage2"
                         style={{height: "60px"}}/>
                      <p>Welcome to BlogShare Application</p>
                      <p>BlogShare is an online magazine or informative website
                        that displays
                        information in a reverse chronological order, with the most
                        recent blogs first. It is
                        a platform where users can share their knowledge,
                        experience or views on a specific
                        topic in their own way
                      </p>
                      <p>
                      <button className="btn btn-primary"
                                   role="button">Register Now
                      </button>
                      </p>
                    </Carousel.Caption>
                </div>

              </Carousel.Item>
              <Carousel.Item>
                <svg className="bd-placeholder-img" width="100%" height="100%"
                     xmlns="http://www.w3.org/2000/svg"
                     preserveAspectRatio="xMidYMid slice" focusable="false"
                     role="img">
                  <rect className="rect1" width="100%" height="100%"
                        fill="#0d47a1"/>
                </svg>
                <div className="container">
                  <Carousel.Caption>
                    <img src={logo4} alt="slideImage2"
                         style={{height: "60px"}}/>
                    <h2>How to Use BlogShare</h2>
                    <p>BlogShare requires registration or log in, after which
                      the user can post, edit, or delete own
                      blog posts. In addition, user can add new categories, view
                      a certain category's blogs and react to other
                      people's blogs by commenting</p>
                    <p>
                      <button className="btn btn-primary"
                                   role="button">Register Now
                      </button>
                    </p>
                  </Carousel.Caption>
                </div>

              </Carousel.Item>
              <Carousel.Item>
                <svg className="bd-placeholder-img" width="100%" height="100%"
                     xmlns="http://www.w3.org/2000/svg"
                     preserveAspectRatio="xMidYMid slice" focusable="false"
                     role="img">
                  <rect className="rect1" width="100%" height="100%"
                        fill="#0d47a1"/>
                </svg>
                <div className="container">
                  <Carousel.Caption >
                    <img src={logo4} alt="slideImage2"
                         style={{height: "60px"}}/>
                    <h2>BlogShare is Secure by Default</h2>
                    <p>Your connection with BlogShare server is secure and
                      encrypted. Your data always stay safe and private</p>
                    <p>
                      <button className="btn btn-primary"
                                   role="button">Register Now
                      </button>
                    </p>

                  </Carousel.Caption>
                </div>

              </Carousel.Item>

            </Carousel>


                <div id="marketing" className="container marketing">

                  <div className="row featurette">
                    <div className="col-md-7">
                      <h2 className="featurette-heading">Register or Login</h2>
                      <p className="lead">In order to access to BlogShare
                        community, you need to register or login</p>
                    </div>
                    <div className="col-md-5">
                      <img src={register}
                           style={{border:"#eee solid 1px",borderRadius: "3px"}}
                           alt="alt" height="400" width="300"/>
                    </div>
                  </div>
                  <hr className="featurette-divider"/>

                    <div className="row featurette">
                      <div className="col-md-7 order-md-2 postEditSection">
                        <h2 className="featurette-heading">Post, Edit, or Delete
                          Blog Posts</h2>
                        <p className="lead">Share your knowledge, experience or
                          views on a specific
                          topic in your own way by posting new blog posts. If it
                          feels like you want to modify already posted blog, you
                          can edit it, even you can delete it</p>
                      </div>
                      <div className="col-md-5 order-md-1">

                        <img src={cappadociaBlog}
                             style={{border:"#eee solid 1px",borderRadius: "3px"}}
                             alt="alt" height="400" width="300"/>


                      </div>
                    </div>

                    <hr className="featurette-divider"/>

                    <div className="row featurette">
                      <div className="col-md-7">
                        <h2 className="featurette-heading">Add New Categories &
                          Browse Blogs by Category</h2>
                        <p className="lead"
                           style={{textAnchor: "middle", verticalAlign: "middle"}}>If
                          you want to post a blog which not belong to the existing
                          categories, you can
                          add a new category to be suitable with your blog
                          subject. You can also browse blogs which belong to a
                          cretain category</p>

                      </div>
                      <div className="col-md-5">
                        <img src={addcategory}
                             style={{border:"#eee solid 1px",borderRadius: "3px"}}
                             alt="alt" height="400" width="300"/>
                      </div>
                    </div>
                    <hr className="featurette-divider"/>
                    <div className="row featurette">
                      <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading">Add Comment</h2>
                        <p className="lead">Interact with other people's blogs by
                          commenting</p>
                      </div>
                      <div className="col-md-5 order-md-1">
                        <img src={addcomment}
                             style={{border:"#eee solid 1px",borderRadius: "3px"}}
                             alt="alt" height="400" width="300"/>
                      </div>
                    </div>

                </div>

          </div>

        </Styles>
    );
  }
}
export default Home;

const Styles = styled.div`
   #custom-home{
      padding:-2rem !important;  
  }
  .carouselSlider{
      text-align: left;
  }
  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    height: 27rem;
  }
#marketing{
  padding:2rem;
  text-align: center;
  text-anchor: end;
}
  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
  }
@media (min-width: 768px) {
  .postEditSection{
    padding-left: 3rem;
  }
  @media (min-width: 995px) {
    .postEditSection{
      padding-left:0;
     /* border: solid 1px green;*/
    }
  }
}

    

`;
