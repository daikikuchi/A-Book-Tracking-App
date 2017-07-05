import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Rating from './Rating'

class WantToRead extends Component {
  constructor(props){
     super(props);

  this.state = { value: 'wantToRead' };

  this.handleUpdate = this.handleUpdate.bind(this);
  }
  static propTypes = {
   books : PropTypes.array.isRequired
 }
handleUpdate = (e,book) => {
    console.log(book)
    const select = e.target.value
    if (this.props.onUpdateBook)
     this.props.onUpdateBook(book, select)

 }

 render() {

       const { books } = this.props

       return(
            <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {books.map((book) => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`   }}></div>
                            <div className="book-shelf-changer">
                              <select value={this.state.value} onChange={(event) => this.handleUpdate(event, book)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                          <div>
                           <Rating book={book} />
                          </div>
                        </div>
                      </li>
                      ))}
                    </ol>
                  </div>
                </div>
            )
          }
        }

export default WantToRead
