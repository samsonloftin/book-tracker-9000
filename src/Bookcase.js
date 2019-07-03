import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookcase extends Component {

// Tells React to only accept certain types for props
  static propTypes = {
    title: PropTypes.string.isRequired,
    mark: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <li key= {book.id}>
                <Book
                  book= {book}
                  mark= {this.props.mark}
                />
              </li>
            ))}
          </ol>
        {/* End of search-books-results tag */}  
        </div>
      {/* End of search-book tag */}
      </div>
    )
  }
}

export default Bookcase