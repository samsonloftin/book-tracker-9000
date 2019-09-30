import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Switch, Route, Redirect } from 'react-router-dom'
import Bookcase from './Bookcase'
import SearchBooks from './SearchBooks'
import './sass/app.scss'
import Navigation from './navigation'

class BooksApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      searchedBooks: [],
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

        {/* Header */}
        <div className='list-header'>
          <div className='list-header-center'>
            <div className='list-books-title'>
              <div>Book Tracker 9000</div>
            </div>
            <Navigation menu={ this.state.menu } />
            <a href='https://github.com/samsonloftin/book-tracker-9000' tabIndex="0" className='repo'>Github Repo</a>
          </div>
        </div>

        {/* Bookcase */ }
        <Switch>
          {/* Search Page */}
          <Route exact path='/search' render={() => (
            <SearchBooks 
              books={this.state.searchedBooks}
              search={this.searchBooks}
              mark={this.markBook}
            />
          )}/>

          {/* Redirect Root */}
          <Route exact path='/' render={() => (
            <Redirect to='/reading' />
          )}/>

          {/* Reading Component */}
          <Route exact path='/reading' render={() => (
            <div>
              <Bookcase 
                title='Reading'
                mark={this.markBook}
                books={this.sortBooks('currentlyReading')}
              />
            </div>
          )}/>

          {/* Will Read Component */}
          <Route exact path='/willread' render={() => (
            <div>
              <Bookcase 
                title='Will Read'
                mark={this.markBook}
                books={this.sortBooks('wantToRead')}
              />
            </div>
          )}/>

          {/* Read Component */}
          <Route exact path='/read' render={() => (
            <div>
              <Bookcase 
                title='Read'
                mark={this.markBook}
                books={this.sortBooks('read')}
              />
            </div>
          )}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp
