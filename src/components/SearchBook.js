import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Bookshelf from './Bookshelf'
import * as BooksAPI from '../BooksAPI'

class SearchBook extends Component {

  state = {
    query: '',
    books: [],

  }

  execSearch = (query) => {
     const search = this.currentSearch = BooksAPI.search(query, 20).then(books => {
       // setState only for the currentSearch Results
       // Without query search, this.curentSearch and search have value of null, With query they have promise
      if (this.currentSearch === search)
          this.setState({books:books})
     })
  }


  updateQuery = (query) => {
    this.currentSearch = null

    if (query)
      this.execSearch(query)

      this.setState({
        books: [],
        query

      })
  }

  render() {

    const {query} = this.state
    let books = this.state.books

    if (books === null && books.error) {
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
