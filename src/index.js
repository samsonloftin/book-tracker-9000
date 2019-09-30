import React from 'react';
import ReactDOM from 'react-dom';
import BooksApp from './App';
import { HashRouter } from 'react-router-dom'

ReactDOM.render(
  <HashRouter basename="/book-tracker-9000">
    <BooksApp />
  </HashRouter>, document.getElementById('root'));
