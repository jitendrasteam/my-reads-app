import React,{ Component } from "react"
import {search} from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {

    state = {
        query : '',
        loading: false,
        books : []
    }

    searchBooksBasedOnQuery = async (query)=>{
        const books = await search(query)
        this.setState({
            query,
            books
        });
        
    }
    render(){

        const {searchQuery,searchedBooks} = this.props;
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.props.onBackPress()}>Close</button>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={searchQuery} onChange={(e)=>{this.props.onSearch(e.target.value)}}/>
              </div>
            </div>
            <div className="search-books-results">
        <ol className="books-grid">
            {searchedBooks && Array.isArray(searchedBooks) && searchedBooks.map(book=>{
                return <Book book={book} updateShelf={this.props.updateShelf}/>
            })}
        </ol>
            </div>
          </div>
        )
    }
}

export default SearchBooks;