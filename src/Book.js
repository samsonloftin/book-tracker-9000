import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  constructor(props) {
    super(props);

    // Sets the initial states
    this.state = {
      status: this.props.book.shelf
    }
  }

  static propTypes = {
    book: PropTypes.object.isRequired,
  }

  markBook = (status) => {
    this.props.mark(this.props.book, status.target.value)
    this.setState({
      status: status.target.value
    })
  }

  placeholder = (image) => {
    if (image === undefined) {
      image = './placeholder.jpg'
    } 
    return ('url(' + image + ')')
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">

          <div className="book-cover" style={{ 
            width: 128,
            height: 193,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: this.placeholder(this.props.book.imageLinks.thumbnail)
          }}></div>

          <div className="book-shelf-changer">
            <select 
              onChange={(this.markBook)}
              value={this.state.status}
            >
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Reading</option>
              <option value="wantToRead">Will Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors}</div>
      </div>
    )
  }
}

 export default Book