import React, {Component} from 'react'
import './App.css'
import Book from './Book'


class ListBooks extends Component {

    state = {
            //at this time, I don't see a need for state...
    }

    handleShelfChange(book, event){
        this.props.shelfchange(book,event);
    }

    render(){

        let books = this.props.books;
        let currentlyReading, wantToRead, read;
        if(books.length > 0){
            currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
            wantToRead = books.filter(book => book.shelf === 'wantToRead');
            read = books.filter(book => book.shelf === 'read');
        }


        return (
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {currentlyReading && currentlyReading.map(book => (
                                    <Book key={book.id} book={book} handleChange={(event) =>{this.handleShelfChange(book, event)}}/>
                                ))}
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {wantToRead && wantToRead.map(book => (
                                    <Book key={book.id} book={book}  handleChange= {(event) =>{this.handleShelfChange(book, event)}}/>
                                ))}
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {read && read.map(book => (
                                    <Book key={book.id} book={book} handleChange= {(event,title) =>{this.handleShelfChange(book,event)}}/>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListBooks