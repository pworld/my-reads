import React from 'react'
import { Route } from 'react-router-dom'

import './App.css'
import { getAll, update, search } from './BooksAPI'
import ListPage from './pages/ListPage'
import SearchPage from './pages/SearchPage'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search:[],
      books: [],
      currentlyReading: [],
      wantToRead: [],
      read: [],
    }
  }

  componentDidMount() {
    getAll()
      .then((books) => {
        this.setState({
          ...this.state,
            books: books,
            currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
            wantToRead: books.filter(book => book.shelf === 'wantToRead'),
            read: books.filter(book => book.shelf === 'read')
        })
      })
  }

  updateShelf = (newCategory, book, oldShelves) => {
    const newBook = {
      ...book,
      shelf:newCategory
    }

    // update state shelves.books
    const books = oldShelves.books.filter(bookShelf => bookShelf.id !== book.id.toString())
    if (newCategory !== 'none') books.push(newBook)

    update(newBook,newCategory)
      .then((res ) => {
        const newCurrentlyReading = books.filter(book => res.currentlyReading.includes(book.id.toString()))
        const newWantToRead = books.filter(book => res.wantToRead.includes(book.id.toString()))
        const newRead = books.filter(book => res.read.includes(book.id.toString()))

        this.setState({
          ...this.state,
            books: books,
            currentlyReading : newCurrentlyReading,
            wantToRead: newWantToRead,
            read: newRead
        })
      })
  }

  resetSearchState() {
    this.setState({
      ...this.state,
      search : []
    })
  }

  assignSearchState(newState) {
    this.setState({
      ...this.state,
      search : newState
    })
  }

  searchState(query) {
    if(query === ''){
      this.resetSearchState([])
    } else {
      search(query)
      .then((books) => {
        let searchBooks = []
  
        // Handle different response from servers
        if (books.length > 0) {
          // update api search book.shelf with state book.shelf
          searchBooks = books.map(book => {
            const filteredBook = this.state.books.filter(fb => fb.id === book.id.toString())
            if(filteredBook.length > 0) {
              book["shelf"] = filteredBook[0].shelf
            }
            return book
          })
        } else {
          searchBooks = []
        }
        this.setState({
          ...this.state,
          search : searchBooks
        })
      })
    }
  }

  render() {
    const { search, books, currentlyReading, wantToRead, read } = this.state

    const shelves = {
      search:search,
      books: books,
      currentlyReading: currentlyReading,
      wantToRead: wantToRead,
      read: read,
    }

    return (
      <div className="app">
        <Route exact path='/' render={({ history }) => (
          <ListPage
            shelves = {shelves}
            onUpdateShelf = {this.updateShelf}
            onClickSearch = {() => {
              this.resetSearchState()
              history.push('/search')
            }}
            />
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchPage
            shelves = {shelves}
            updateSearchProps = {(query, prevStateSearch) => {
              this.searchState(query, prevStateSearch)
            }}
            onSearch = {(query) => {
              this.searchState(query)
            }}
            onAssignSearchState = {(state) => {
              this.assignSearchState(state)
            }}
            onUpdateShelf = {(newCategory, book, oldShelves) => {
              this.updateShelf(newCategory, book, oldShelves)
              this.resetSearchState()
              history.push('/')
            }}
            onBack = {() => {
              this.resetSearchState()
              history.push('/')
            }}
            />
        )} />
      </div>
    )
  }
}

export default BooksApp
