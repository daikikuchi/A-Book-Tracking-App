import React from 'react'
import {Route} from 'react-router-dom'
import SearchBook from './components/SearchBook'
import CurrentlyReading from './components/CurrentlyReading'
import WantToRead from './components/WantToRead'
import Rating from './components/Rating'
import Read from './components/Read'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.updateBook = this.updateBook.bind(this);
    this.isBookOnShelf = this.isBookOnShelf.bind(this);
  }

  state = {
    books: []
  }

  isBookOnShelf(id) {
    let searchedBooksOnShelf

    if (this.state.books) {
      searchedBooksOnShelf = this.state.books.filter((book) => book.id === id)
      if (searchedBooksOnShelf.length !== 0) {
        // console.log(searchedBooksOnShelf)
        // console.log(searchedBooksOnShelf[0])
        // console.log(searchedBooksOnShelf[0].shelf)
        return searchedBooksOnShelf[0].shelf
      } else {
        return null
      }
    }
  }

  updateBook(book, shelf) {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf // Update selected book shelf with new chosen shelf
        this.setState(state => ({
          books: state.books.filter((b) => b.id !== book.id).concat([book])
        }))
      })
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books}) // sames as ({books: books })  ES6

    })
  }

  render() {

    let currentlyReading
    let wantToRead
    let read

    if (this.state.books !== null) {
      currentlyReading = this.state.books.filter((book) => book.shelf === 'currentlyReading')
      wantToRead = this.state.books.filter((book) => book.shelf === 'wantToRead')
      read = this.state.books.filter((book) => book.shelf === 'read')
    }

    return (
      <div className="app">
        <Route exact path="/" render={() => (<CurrentlyReading books={currentlyReading} onUpdateBook={this.updateBook}/>)}/>
        <Route exact path="/" render={() => (<WantToRead books={wantToRead} onUpdateBook={this.updateBook}/>)}/>
        <Route exact path="/" render={() => (<Read books={read} onUpdateBook={this.updateBook}/>)}/>
        <Route path="/search" render={() => (<SearchBook isBookOnShelf={this.isBookOnShelf} onUpdateBook={this.updateBook}/>)}/>
        <Route path="/rating" render={() => (<Rating/>)}/>
      </div>
    )
  }
}

export default BooksApp
