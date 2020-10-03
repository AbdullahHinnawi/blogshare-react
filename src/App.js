import React from 'react';

import './css/App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import NavigationBar from './components/layout/NavigationBar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/views/Home';
import CreateBlog from './components/views/CreateBlog';
import AllBlogs from './components/views/AllBlogs';
import MyBlogs from './components/views/MyBlogs';
import Register from './components/views/Register';
import Login from './components/views/Login';
import AddCategory from './components/views/AddCategory'
import ShowBlog from './components/views/ShowBlog';
import Footer from './components/layout/Footer';


const App = () => {
  return (
      <Router>
          <div className="App">
            <NavigationBar/>
            <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/all-blogs" component={AllBlogs}/>
            <Route path="/my-blogs" component={MyBlogs}/>
            <Route path="/create-blog" component={CreateBlog}/>
            <Route path="/blogs/show/:id" component={ShowBlog}/>
            <Route path="/add-category" component={AddCategory}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            </Switch>
            <Footer/>
          </div>
      </Router>
  );
};

export default App;
