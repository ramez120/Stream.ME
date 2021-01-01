import React from "react";
import   {Router, Route}    from 'react-router-dom';
import cors from 'cors';

import history from '../history';
import Header from "./Header";
import StreamList from './streams/StreamList';
import StreamCreate from './streams/StreamCreate';
import StreamShow from './streams/StreamShow';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import './App.css';


const App = () => {
  return (
      <div>
          
      <Router history = {history}>
      <Header />
        <Route path = "/" exact component = {StreamList} />
        <Route path = "/streams/new" exact component = {StreamCreate} />
        <Route path = "/streams/edit/:id" exact component = {StreamEdit} />
        <Route path = "/streams/delete/:id" exact component = {StreamDelete} />
        <Route path = "/streams/show" exact component = {StreamShow} />


      
      
      </Router>
</div>
  )
};



export default App;