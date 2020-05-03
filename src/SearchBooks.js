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

        const {query,books,loading} = this.state;
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.props.onBackPress()}>Close</button>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={query} onChange={(e)=>{this.searchBooksBasedOnQuery(e.target.value)}}/>
              </div>
            </div>
            <div className="search-books-results">
        <ol className="books-grid">
        
            {loading && 
            <div>Show Spinner</div>}
            {books && Array.isArray(books) && books.map(book=>{
                return <Book book={book}/>
            })}
        </ol>
            </div>
          </div>
        )
    }
}

export default SearchBooks;