import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Bookshelf from './Bookshelf'
import * as BooksAPI from '../BooksAPI'

class SearchBook extends Component {

  state = {
    query: '',
    searchedBooks: []
  }

  updateQuery = (query) => {
    this.setState({query: query.trim()})
    BooksAPI.search(query, 20).then(books => this.setState(state => ({searchedBooks: books})))

  }

  render() {

    const {query} = this.state
    let books = this.state.searchedBooks

    if (books === null || books.error) {
      books = []
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/"></Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <h1>Searching results for "{query}"</h1>
          <ol className="books-grid">
            {books.map((book) => (<Bookshelf onUpdateBook={this.props.onUpdateBook} book={book} key={book.id}/>))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook
