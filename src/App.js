import React, { Component } from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Bookcase from './Bookcase'
import SearchBooks from './SearchBooks'

class BooksApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      searchedBooks: []
    }
  }

  componentDidMount() {
    this.getAllBooks()
  }

  // Gets all the books
  getAllBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books: books
        })
    })
  }

  // Sorts all the books based on their status
  sortBooks = (status) => {
    return this.state.books.filter((book) => book.shelf === status)
  }

  // Marks any changes to the status of a book
  markBook = (book, status) => {
    BooksAPI.update(book, status)
      .then(() => {
        // first sets the status of the book
        book.shelf = status
        this.setState((state) => ({
          books: state.books.filter(
            // adds searched book into book array if it isn't already there
            (filterBook) => filterBook.id !== book.id).concat([ book ])
        }))
      })
  }

  // Searches books based on a query
  searchBooks = (query) => {
    // Checks if Query is true or false
    if (query) {
      BooksAPI.search(query)
        .then((searchingBooks) => {
          // Checks if there are any searched books
          if (searchingBooks.length) {
            this.setState((state) => ({
              searchedBooks: searchingBooks.map((searchedBook) => {
                let book = state.books.find(book => searchedBook.id === book.id);
                searchedBook.shelf = book ? book.shelf : 'none'
                return searchedBook
              })
            }))
          }
        })
    } else {
      // clears search results
      return this.setState({
        searchedBooks: []
      })
    }
  }

  render() {
    return (
      // wraps the entire app in a div
      <div className='app'>

        {/* Bookcase */ }
        <Route exact path='./' render={() => (

          /* Book Container */
          <div className='list-books'>

            {/* Header */}
            <div className='list-books-title'>
                <h1>Book Tracker</h1>
            </div>  

            {/* Bookcase - lists all books */}
            <div className='list-books-content'>
              <div>
                {/* Reading */}
                <Bookcase 
                  title='Reading'
                  mark={this.markBook}
                  books={this.sortBooks('currentlyReading')}
                />
                {/* Will Read */}
                <Bookcase 
                  title='Will Read'
                  mark={this.markBook}
                  books={this.sortBooks('wantToRead')}
                />
                {/* Read */}
                <Bookcase 
                  title='Read'
                  mark={this.markBook}
                  books={this.sortBooks('read')}
                />
              </div>

            {/* Link Open Search */}
            <Link to='/search'
                  className='open-search'
            >Open</Link>

            </div>
          </div>
        /* Bookcase End Tag*/  
        )} />

        {/* Search Page */}
        <Route exact path='/search' render={() => (
          <SearchBooks 
            books={this.state.searchedBooks}
            search={this.searchBooks}
            mark={this.markBook}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
