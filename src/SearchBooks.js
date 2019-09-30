import React, { Component } from 'react'
import PropTypes from 'prop-types'
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

clearQuery = (query) => {
  let clear = query
  clear = ''
  this.props.search(clear)
}

  render () {
    return (
      <div className="search-books">

    <div className='search-books-bar'>
          { /* Search Input Field */}
          <DebounceInput
            type='text'
            debounceTimeout={300}
            placeholder='Search by title or author'
            onChange={(query) => this.query(query.target.value)}
          />
    </div>

      <div className='search-books-results'>
        <ol className="books-grid">
          {/* Searched Books */}
           {(this.props.books !== undefined) ? (
            this.props.books.map((book) => (

              (book !== undefined) ? (
              // Adds a unique key to the list item
              <li key={book.id}>
                <Book
                  book={book}
                  mark={this.props.mark}
                />
            </li>
              ) : (
                <li>
                <div className="book-title">No books to display</div>
              </li>
              )
            ))) : (
              <li>
                <div className="book-title">No books to display</div>
              </li>
            )
          }
        </ol>
        <div className='searchTermSection'>
          <div className='searchTermSectionDesc'>
            The backend API is from Udacity & uses a fixed set of cached search results and is limited to the search terms below.
          </div>
          <div>
            Android, Art, Artificial Intelligence, Astronomy, Austen, Baseball, Basketball, Bhagat, Biography, Brief, Business, Camus, Cervantes, Christie, Classics, Comics, Cook, Cricket, Cycling, Desai, Design, Development, Digital Marketing, Drama, Drawing, Dumas, Education, Everything, Fantasy, Film, Finance, First, Fitness, Football, Future, Games, Gandhi, Homer, Horror, Hugo, Ibsen, Journey, Kafka, King, Lahiri, Larsson, Learn, Literary Fiction, Make, Manage, Marquez, Money, Mystery, Negotiate, Painting, Philosophy, Photography, Poetry, Production, Programming, React, Redux, River, Robotics, Rowling, Satire, Science Fiction, Shakespeare, Singh, Swimming, Tale, Thrun, Time, Tolstoy, Travel, Ultimate, Virtual Reality, Web Development, iOS
          </div>
        </div>


      </div>
    </div>
    )
  }
}

export default SearchBooks