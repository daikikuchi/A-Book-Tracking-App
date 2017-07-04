import React from 'react'
import { Route } from 'react-router-dom'
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
  }

state = {
      books : [],

     }


      //  updateBook(book,shelf) {
      //   BooksAPI.update(book,shelf);
      //   BooksAPI.getAll().then((books) => {
      //   this.setState({ books: books })
      // })
      // }

  //     updateBook(book,shelf) {
  //     BooksAPI.update(book, shelf).then(book => {
  //
  //      // Let's try changing the shelf value on all books:
  //      this.setState(state => ({
  //      currentlyReading: state.currentlyReading.concat([ book ])
  //      }))
  //
  //   })
  // }

  updateBook(book, shelf) {
    let self = this
    BooksAPI.update(book, shelf).then(function() {
      BooksAPI.getAll().then(books => self.setState({
        books: books
      }))

    })

  }

    componentDidMount() {
      BooksAPI.getAll().then((books) => {
        this.setState({ books }) // sames as ({books: books })  ES6

    })

   }




  render() {

    let currentlyReading
    let wantToRead
    let read

    if(this.state.books !== null) {
        currentlyReading = this.state.books.filter((book) => book.shelf === 'currentlyReading')
        wantToRead = this.state.books.filter((book) => book.shelf === 'wantToRead')
        read = this.state.books.filter((book) => book.shelf === 'read')


      }


    return (
      <div className="app">
        <Route path="/search" render={() => (
             <SearchBook  />)}/>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
        <Route exact path="/" render={() => (

          <CurrentlyReading
            // onDeleteContact={this.removeContact}
            books={currentlyReading}
            onUpdateBook={this.updateBook}
          />
        )}/>
       <Route exact path="/" render={() => (
        <WantToRead

          books={wantToRead}
          onUpdateBook={this.updateBook}

        />
      )}/>
      <Route exact path="/" render={() => (
       <Read

         books={read}
        //  onUpdateBook ={this.updateBook}
        onUpdateBook={this.updateBook}
       />
     )}/>
         <Route path="/rating" render={() => (
              <Rating
              onUpdateBook={this.props.onUpdateBook}

           />)}/>
      </div>
    </div>


     )

 }
}

export default BooksApp
