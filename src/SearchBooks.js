import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'
import {DebounceInput} from 'react-debounce-input';

class SearchBooks extends Component {
// Tells React to only accept certain types for props
static propTypes = {
  books: PropTypes.array.isRequired,
  search: PropTypes.func.isRequired,
  mark: PropTypes.func.isRequired,
}

// runs query through the search function
query = (query) => {
  this.props.search(query.trim())
}

  render () {

    return (
      <div className="search-books">
      <div className='search-books-bar'>

        {/* Link Close Search */}
        <Link 
          to='/'
          className='close-search'
        >Close</Link>

        <div className='search-books-input-wrapper'>
          { /* Search Input Field */}
          <DebounceInput
            type='text'
            debounceTimeout={300}
            placeholder='Search by title or author'
            onChange={(query) => this.query(query.target.value)}
          />
        </div>
      </div>

      <div className='search-books-results'>
        <ol className="books-grid">
          {/* Searched Books */}
           {(this.props.books !== undefined) ? (
            this.props.books.map((book) => (
            // Adds a unique key to the list item
            <li key={book.id}>
              <Book
                book={book}
                mark={this.props.mark}
              />
            </li>
            ))) : (
              <li>
                <div className="book-title">No books to display</div>
              </li>
            )
          }
        </ol>
      </div>
    </div>
    )
  }
}

export default SearchBooks