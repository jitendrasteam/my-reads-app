import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import BookSection from './BookSection'
import  { Route   } from 'react-router-dom'
class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route exact path = '/' render = {({history})=><BookSection    
        searchBook = {()=>{history.push("/search")}
        }/>}/>
        <Route path = '/search' render = {({history})=><SearchBooks
        onBackPress = {()=>{
          history.push("/")
        }}/>}/>   
      </div>
    )
  }
}

export default BooksApp
