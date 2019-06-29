import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  // Tells React to only accept certain types for props
  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  // Sets an init state for props
  state = {
    query: ''
  }

  updateQuery = (query) => {
    if (this.props.searchingBooks) {
      this.setState(() => ({
        query: query.trim()
      }))
    }
  }

  clearQuery = () => {
    this.updateQuery('')
  }

  render() {
    const { query } = this.state
    const { books } = this.props


    const showBooks = books

    return (
    <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}

                { /* Search Input Field */}
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={query}
                  onChange={(update) => this.updateQuery(update.target.value)}
                />
              </div>
            </div>

            <div className="search-books-results">
              <ol className="books-grid">

                {showBooks.map((book) => (
                  <li key={book.id} className='book'>
                    <div className="book-top">
                      <div 
                        className="book-cover" 
                        style={{ 
                          width: 128, 
                          height: 174,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundImage: `url(${book.imageLinks.thumbnail})`
                      }}></div>

                        <div className="book-shelf-changer">
                          <select>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>

                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.author}</div>
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

export default SearchBooks