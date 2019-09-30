import React from 'react';
import ReactDOM from 'react-dom';
import BooksApp from './App';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter basename="/">
    <BooksApp />
  </BrowserRouter>, document.getElementById('root'));
