import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import Bookcase from './Bookcase'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
      }))
    })
  }

  searchBooks = (bookQuery) => {
    BooksAPI.search(bookQuery)
      .then((bookQuery) => {
        this.setState((book) => ({
          books: book.books.concat([bookQuery])
        }))
      })
  }

  render() {
    return (
      <div className="app">
        {/* Search Page */}
        {this.state.showSearchPage ? (
          <SearchBooks 
            books={this.state.books}
            searchingBooks={(bookQuery) => {
              this.searchBooks(bookQuery)
            }}
          />
        ) : (
          <Bookcase />
        /* this.state.showSearchPage end tag */
        )}
      </div>
    )
  }

}

export default BooksApp
