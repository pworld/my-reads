import React from 'react';
import PropTypes from 'prop-types'

class ListComponents extends React.Component {
  static propTypes = {
    selectedShelves: PropTypes.array.isRequired,
    shelves: PropTypes.object.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
  }

  render() {
    const { selectedShelves, shelves, onUpdateShelf } = this.props

    return (
      <ol className="books-grid">
        {selectedShelves.length > 0 &&
          selectedShelves.map(function(item, i){
            return (
              <li key={i}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${typeof item.imageLinks !== 'undefined' && item.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select value={item.shelf ? item.shelf : 'none'}
                        onChange={(e) => onUpdateShelf(e.target.value, item, shelves)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading" >Currently Reading</option>
                        <option value="wantToRead" >Want to Read</option>
                        <option value="read" >Read</option>
                        <option value="none" >None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{typeof item.title !== 'undefined' && item.title}</div>
                  <div className="book-authors">{typeof item.authors !== 'undefined' && item.authors.join(" and ")}</div>
                </div>
              </li>
            )
          })
        }
      </ol>
    )
  };
}

export default ListComponents;
