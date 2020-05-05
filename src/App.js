import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import BookSection from './BookSection'
import  { Route   } from 'react-router-dom'
import {update,getAll,search} from './BooksAPI'

class BooksApp extends React.Component {

  state = {
    books : [],
    searchedBooks : []
  }

  async componentDidMount(){
    this.getBooks()
  }

  async updateShelf(book,shelf){
   update(book,shelf).then(async response => await this.getBooks())
 }

  async getBooks(){
    let books = await getAll()
    this.setState({
     books:books
    })
  }

  async searchBooksBasedOnQuery(query){
    const searchedBooks = await search(query)
    this.setState({
        query,
        searchedBooks
    });
    
}
  
  render() {
    return (
      <div className="app">
        <Route exact path = '/' render = {({history})=>
        <BookSection   
          books = {this.state.books} 
          searchBook = {()=>{history.push("/search")}}
          updateShelf = {(book,shelf)=>{this.updateShelf(book,shelf)}}
          />
          }/>
        <Route path = '/search' render = {({history})=>
        <SearchBooks
          updateShelf = {this.updateShelf}
          onBackPress = {()=>{history.push("/")}}
          searchedBooks = {this.state.searchedBooks}
          searchQuery = {this.state.query}
          onSearch = {(query)=>{this.searchBooksBasedOnQuery(query)}}
          />}/>   
      </div>
    )
  }
}

export default BooksApp
