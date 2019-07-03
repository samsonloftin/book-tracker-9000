import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BooksApp from './App';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter basename="/book-tracker-9000">
    <BooksApp />
  </BrowserRouter>, document.getElementById('root'));
