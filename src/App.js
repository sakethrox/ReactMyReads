import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import Book from "./Book";
import {Link, Route} from 'react-router-dom'

class BooksApp extends React.Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: '',
    query: '',
    searchList: '',
  }

  componentDidMount(){

      BooksAPI.getAll().then((data) => this.setState({books: data}))

  }

  shelfChange(book,event,history){
        book.shelf = event.target.value
        let data = this.state.books.filter((data) => book.id !== data.id)
        this.setState({
            books: [...data,book]
        })
      BooksAPI.update(book,book.shelf)
  }

  updateQuery(value){
      this.setState({
          query: value
      })

      BooksAPI.search(value).then((data) =>  {
          if(data && data["error"]){
              alert('Invalid search!!')
          }
          else{
              this.setState({searchList:data})
          }}) //
  }

  render() {
    return (

      <div className="app">
            <Route path='/search' render={({history}) => (
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to='/'>
                            <button className="close-search">Close</button>
                        </Link>

                            <div className="search-books-input-wrapper">


                            {/*
                          NOTES: The search from BooksAPI is limited to a particular set of search terms.
                          You can find these search terms here:
                          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                          you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={event => this.updateQuery(event.target.value)}/>

                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {this.state.searchList && this.state.searchList.map((book) =>
                                <Book key={book.id} book={book} handleChange={(event) =>{
                                    this.shelfChange(book, event)
                                    history.push('/')
                                    }} //
                                />
                            )}
                        </ol>
                    </div>
                </div>
            )}/>

            <Route exact path='/' render={() => (
                <div className="list-books">
                    <div className="list-books-title">
                    <h1>MyReads</h1>
                    </div>
                    <ListBooks books={this.state.books} shelfchange={(book,event) => this.shelfChange(book,event)}/>
                    <div className="open-search">
                    <Link to='/search'>
                        <button>Add a book</button>
                    </Link>
                    </div>
                </div>
            )}/>
      </div>
    )
}
}
export default BooksApp
