import React, { Component } from 'react'
import read from './icons/read.png'
import willread from './icons/willread.png'
import reading from './icons/reading.png'
import search from './icons/search.png'
import { Link } from 'react-router-dom'


class Navigation extends Component {

  render() {
    return (
        <div className='menu'>
          <Link to='/search' tabIndex="0"><img src={ search } alt='search icon'></img></Link>
          <Link to='/reading' tabIndex="0"><img src={ reading } alt='reading icon'></img></Link>
          <Link to='/willread' tabIndex="0"><img src={ willread } alt='will read icon'></img></Link>
          <Link to='/read' tabIndex="0"><img src={ read } alt='read icon'></img></Link>
        </div>
    )
  }
}

export default Navigation;