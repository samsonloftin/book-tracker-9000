import React, { Component } from 'react'
import CompletedBooks from './CompletedBooks'
import CurrentBooks from './CurrentBooks'
import WantedBooks from './WantedBooks'

class Bookcase extends Component {
  render() {
    return(

    /* Book Container */
    <div className="list-books">

    {/* Header */}
    <div className="list-books-title">
        <h1>MyReads</h1>
    </div>  

    {/* Bookcase */}
    <div className="list-books-content">
      <div>
        <CurrentBooks />
        <WantedBooks />
        <CompletedBooks />
      </div>
    </div>

    {/* Search Button */}
    <div className="open-search">
      <button onClick={() => 
        this.setState({ 
          showSearchPage: true 
        })
      }>Add a book</button>
    </div>

    {/* list-books end tag */}
    </div>
    )
  }
}

export default Bookcase