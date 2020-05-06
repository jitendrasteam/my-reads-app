import React, { Component } from "react";

const placeholderImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTU8Wsi3Irxo8o7kRjCwlFRaCqy5NRl-Q-fdkZMwpc7scSbAPsd&usqp=CAU";
class Book extends Component {
  render() {
    const { book } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                book.imageLinks && book.imageLinks.smallThumbnail
                  ? `url(${book.imageLinks.smallThumbnail})`
                  : `url(${placeholderImage})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              onChange={(e) => {
                this.props.updateShelf(book, e.target.value);
              }}
              value={book.shelf}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors &&
            Array.isArray(book.authors) &&
            book.authors.map((authors, index) => (
              <div key={`${authors}-${index}`}>{authors}</div>
            ))}
        </div>

      </div>
    );
  }
}

export default Book;
