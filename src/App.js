import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import SearchBooks from "./SearchBooks";
import BookSection from "./BookSection";
import { Route } from "react-router-dom";
import { update, getAll, search } from "./BooksAPI";
import { Snackbar } from "@material/react-snackbar";
import "@material/react-snackbar/dist/snackbar.css";

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: [],
    showSnackBar: false,
    snackBarMessage: "Updated"
  };

  async componentDidMount() {
    this.getBooks();
  }

  async updateShelf(book, shelf) {
    update(book, shelf)
      .then(async (response) => await this.getBooks())
      .then(() =>
        this.setState({
          showSnackBar: true,
          snackBarMessage: "Updated"
        })
      );
  }

  async getBooks() {
    let books = await getAll();
    this.setState((previosState)=>({
      query:previosState.query,
      searchedBook:previosState.searchedBooks,
      books:books
    }));
  }

  async searchBooksBasedOnQuery(query) {
    this.setState({
      query,
      showSnackBar: true,
      snackBarMessage: "Loading Please wait"
    });
    let searchedBooks = await search(query);
    if(searchedBooks && Array.isArray(searchedBooks)){
    searchedBooks = searchedBooks.map(book => {
      book.shelf = "none";
      this.state.books.forEach(book2 => {
        if (book.id === book2.id) {
          book.shelf = book2.shelf;
        }
      })
      return book
    })
  }
  this.setState({
    searchedBooks:searchedBooks||[],
    showSnackBar: false
  });
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={({ history }) => (
            <BookSection
              books={this.state.books}
              searchBook={() => {
                this.setState({
                  searchedBooks:[],
                  query:""
                })
                history.push("/search");
              }}
              updateShelf={(book, shelf) => {
                this.updateShelf(book, shelf);
              }}
            />
          )}
        />
        <Route
          path="/search"
          render={({ history }) => (
            <SearchBooks
              updateShelf={(book, shelf) => {
                history.push("/");
                this.updateShelf(book, shelf);
              
              }}
              onBackPress={() => {
                history.push("/");
              }}
              searchedBooks={this.state.searchedBooks}
              searchQuery={this.state.query}
              onSearch={(query) => {
                this.searchBooksBasedOnQuery(query);
              }}
            />
          )}
        />
        <div>
          {this.state.showSnackBar && (
            <Snackbar
              message={this.state.snackBarMessage}
              onClose={() => {
                this.setState({
                  showSnackBar: false,
                });
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default BooksApp;
