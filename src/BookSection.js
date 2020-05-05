import React , {Component} from 'react'
import {getAll} from './BooksAPI'
import Book from './Book'

class BookSection extends Component {
    render(){
       const currentlyReading = this.props.books.filter(book=>book.shelf==='currentlyReading')
       const wantToRead = this.props.books.filter(book=>book.shelf==='wantToRead')
       const read = this.props.books.filter(book=>book.shelf==='read')
        return (<div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {!currentlyReading.length&&
                     <div>Loading</div>
                  }
                  {
                    currentlyReading.map(book=><Book book={book} updateShelf={this.props.updateShelf}/>)
                  }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {!wantToRead.length&&
                     <div>Loading</div>
                  }
                {
                    wantToRead.map(book=>{
                      return <Book book={book} updateShelf={this.props.updateShelf}/>
                    })
                  }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {!read.length&&
                     <div>Loading</div>
                  }
                {
                    read.map(book=>{
                      return <Book book={book} updateShelf={this.props.updateShelf}/>
                    })
                  }
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => this.props.searchBook()}>Add a book</button>
        </div>
      </div>
   )
    }
}

export default BookSection;