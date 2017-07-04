import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import CurrentlyReading from './CurrentlyReading'
import * as BooksAPI from '../BooksAPI'

class SearchBook extends Component {

 state = {
   query: '',
   searchedBooks: [],

 }

updateQuery = (query) => {
  this.setState({ query:query.trim()})
  BooksAPI.search(query, 20).then(books => this.setState(state =>({
  searchedBooks: state.searchedBooks.concat([books])
})))
console.log(this.state.searchedBooks)
}

// updateQuery = (query) => {
//     this.setState({query: query})
//
//     if(query.trim() !== '') {
//       BooksAPI.search(query, 20).then(books => this.setState({
//         searchedBooks: books
//       }))
//       console.log(this.state.searchedBooks)
//     }
//   }




 render() {

     const { query } = this.state

     let currentlyReading
     let wantToRead
     let read

     if(this.state.searchedBooks !== null) {
         currentlyReading = this.state.searchedBooks.filter((book) => book.shelf === 'currentlyReading')
         wantToRead = this.state.searchedBooks.filter((book) => book.shelf === 'wantToRead')
         read = this.state.searchedBooks.filter((book) => book.shelf === 'read')

       }



   return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/"></Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <h1>Searching results for "{query}"</h1>
            <ol className="books-grid">
              <CurrentlyReading
                // onDeleteContact={this.removeContact}
                books={currentlyReading}
                onUpdateBook={this.props.updateBook}
              />
            </ol>
          </div>
        </div>
      )
   }
 }


export default SearchBook
