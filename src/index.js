import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-bootstrap/Carousel';
import "../node_modules/bootstrap/dist/css/bootstrap.css"
//import "react-responsive-carousel/lib/styles/carousel.min.css";
//import "react-carousel/lib/styles/carousel.min.css";

import '../node_modules/react-multi-carousel/lib/styles.css'


ReactDOM.render(
    /*
  <React.StrictMode>
    <App />
  </React.StrictMode>*/
    <Suspense fallback={<div>Loading</div>}>
      <App useSuspense={true}/>
    </Suspense>


    ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
