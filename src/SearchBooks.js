import React, { Component } from "react";
import { search } from "./BooksAPI";
import Book from "./Book";
import searchImage from "./icons/searchImage.png";

class SearchBooks extends Component {
  render() {
    const { searchQuery, searchedBooks } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={() => this.props.onBackPress()}
          >
            Close
          </button>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchQuery}
              onChange={(e) => {
                this.props.onSearch(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchedBooks &&
              Array.isArray(searchedBooks) &&
              searchedBooks.map((book) => {
                return (
                  <Book
                    key={`${book.id}`}
                    book={book}
                    updateShelf={this.props.updateShelf}
                  />
                );
              })}
            {(!searchedBooks) && (
              <div>
                <img className="search-image" src={searchImage} />
                <div
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    background: "lightgrey",
                  }}
                >
                  Search A Book By Author Or Title
                </div>
              </div>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
