import React, { Component } from "react";
import { getAll } from "./BooksAPI";
import Book from "./Book";
import icon from "./icons/lender.png";
import NoBooks from "./Components/NoBooksComponent/NoBooks";
class BookSection extends Component {
  render() {
    const currentlyReading = this.props.books.filter(
      (book) => book.shelf === "currentlyReading"
    );
    const wantToRead = this.props.books.filter(
      (book) => book.shelf === "wantToRead"
    );
    const read = this.props.books.filter((book) => book.shelf === "read");
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>
            <span>
              <img src={icon} className="icon-size" />
            </span>
            Lendr
          </h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {!currentlyReading.length && <NoBooks />}
                  {currentlyReading.map((book, index) => (
                    <Book
                      key={`${book.id}-${index}`}
                      book={book}
                      updateShelf={this.props.updateShelf}
                    />
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {!wantToRead.length && <NoBooks />}
                  {wantToRead.map((book, index) => (
                    <Book
                      key={`${book.id}-${index}`}
                      book={book}
                      updateShelf={this.props.updateShelf}
                    />
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {!read.length && <NoBooks />}
                  {read.map((book, index) => (
                    <Book
                      key={`${book.id}-${index}`}
                      book={book}
                      updateShelf={this.props.updateShelf}
                    />
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => this.props.searchBook()}>Add a book</button>
        </div>
      </div>
    );
  }
}

export default BookSection;
