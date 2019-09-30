import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookcase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: false,
    }

    this.toggleSection = this.toggleSection.bind(this);
  }

// Tells React to only accept certain types for props
  static propTypes = {
    title: PropTypes.string.isRequired,
    mark: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }

  toggleSection = () => {
    this.setState({
      menu: !this.state.menu,
    })
  }

  render() {
    return (
      <div className="bookshelf">


        <div className="bookshelf-books">
          <div className="bookshelf-title">{ this.props.title }</div>
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