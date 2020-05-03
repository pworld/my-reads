import React from 'react'
import PropTypes from 'prop-types'

import ListComponents from '../components/ListComponents'

class ListPage extends React.Component {

  static propTypes = {
    shelves: PropTypes.object.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
    onClickSearch: PropTypes.func.isRequired
  }

  render() {
    const { shelves, onUpdateShelf, onClickSearch } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ListComponents
                  selectedShelves={shelves.currentlyReading}
                  shelves={shelves}
                  onUpdateShelf = {onUpdateShelf}
                  />
              </div>
            </div>
          </div>
        </div>

        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ListComponents
                  selectedShelves={shelves.wantToRead}
                  shelves={shelves}
                  onUpdateShelf = {onUpdateShelf}
                  />
              </div>
            </div>
          </div>
        </div>

        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ListComponents
                  selectedShelves={shelves.read}
                  shelves={shelves}
                  onUpdateShelf = {onUpdateShelf}
                  />
              </div>
            </div>
          </div>
        </div>

        <div className="open-search">
          <button onClick={() => onClickSearch() }>Add a book</button>
        </div>
      </div>
    )
  }
}

export default ListPage
