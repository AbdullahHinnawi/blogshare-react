import React from 'react';

import './css/App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import NavigationBar from './components/layout/NavigationBar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/views/Home';
import CreateBlog from './components/views/CreateBlog';
import AllBlogs from './components/views/AllBlogs';
import Register from './components/views/Register';
import Login from './components/views/Login';
import AddCategory from './components/views/AddCategory'


const App = () => {
  return (
      <Router>
          <div className="App">
            <NavigationBar/>
            <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact  path="/all-blogs" component={AllBlogs}/>
            <Route exact  path="/create-blog" component={CreateBlog}/>
              <Route exact  path="/add-category" component={AddCategory}/>
            <Route exact  path="/login" component={Login}/>
            <Route exact  path="/register" component={Register}/>
            </Switch>
          </div>
      </Router>
  );
};

export default App;
