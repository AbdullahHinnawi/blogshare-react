import React, {Component} from 'react';

import styled from 'styled-components';
import baseUrl from '../../baseUrl';
import axios from 'axios';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



//import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


class CreateBlog extends Component{

  constructor(props){
    super(props);

    this.state = {
      blog:{
        title:'',
        category: 'Technology',
        body:'',
        date: '',
        image: '',
        author: 'www'
      },
      categories:[],
      editorContent:''


    };
    this.onImageUpload = this.onImageUpload.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);



  }
  async componentDidMount() {

    try{
      const res =  await axios.get(baseUrl+'/api/categories', {
        headers: {
          Authorization: '',
        }
      });
      window.console.log('data',res.data);
      this.setState({categories: res.data.categories});
    }catch(err){
      window.console.log(err);
    }
  }
   onImageUpload(event){
    window.console.log('FileList', event.target.files);
     this.state.blog.image = event.target.files[0];
     window.console.log('this.state.blog.image', this.state.blog.image);
  }
  onChange(e) {
    //this.setState({ [e.target.name]: e.target.value });
    let blog = this.state.blog;
    blog[e.target.name] = e.target.value;
    this.setState({ blog });
  }


  async onSubmit(e){
    e.preventDefault();

    if(this.state.editorContent !== '') {

      this.state.blog.body = this.state.editorContent.replace(/<[^>]+>/g, ' ');
      window.console.log('body: ', this.state.blog.body);

      let formData = new FormData();
      formData.append('title', this.state.blog.title);
      formData.append('body', this.state.blog.body);
      formData.append('category', this.state.blog.category);
      formData.append('date', this.state.blog.date);
      formData.append('author', this.state.blog.author);
      formData.append('imageFile', this.state.blog.image);
      window.console.log('THIS:BLOG______', formData);

      await axios.post(baseUrl + '/api/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: '',
        }
      }).then(function(res) {
        window.console.log('res.data', res.data);
      }).catch(function(err) {
        window.console.log('errrrrrrrrrrrrrrrrrrrroooooooooooor', err);
      });

    }else{
      window.console.log('editor field is empty');
    }



  }
  render() {
    const {categories} = this.state;
    return(
        <Styles>

          <div id="create-blog" style={{marginTop:'100px'}}>

            <h2 className="custom-form mb-3">Create Blog</h2>
            <form className="custom-form" onSubmit={this.onSubmit}>

              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" id="title"
                       name="title"
                       placeholder="Title"
                       value={this.state.blog.title}
                       onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                  <label htmlFor="category">Category</label>
                <select
                    value={this.state.blog.category}
                    onChange={this.onChange}
                    id="category"
                    name="category"
                    ref="category"
                >
                  {categories.map((category) => (<option key={category._id} id={category._id} title={category.name} value={category.name}>
                        {category.name.toUpperCase()}
                      </option>))}
                  </select>
              </div>

              <div className="form-group textEditor">
                <label htmlFor="textEditorContent"/>
                <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onInit={ editor => {
                      // You can store the "editor" and use when it is needed.
                      console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                      const data = editor.getData();
                      //console.log( { event, editor, data } );
                      this.setState({editorContent: data});
                      //console.log( "content", this.state.content);
                    } }
                    onBlur={ ( event, editor ) => {
                      console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                      console.log( 'Focus.', editor );
                    } }
                />

               </div>

              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input type="file" id="image" name="imageFile" onChange={this.onImageUpload}
                       accept="image/*" ref="imageFile"
                   />
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

