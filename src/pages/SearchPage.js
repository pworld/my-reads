import React from 'react'
import PropTypes from 'prop-types'

import '../App.css'
import ListComponents from '../components/ListComponents'

class ListPage extends React.Component {

  static propTypes = {
    shelves: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onAssignSearchState: PropTypes.func.isRequired,
  }

  state = {
    query: ''
  }
  updateQuery = (e) => {
    const query = e.target.value ? e.target.value : ''
    let prevStateSearch = []

    if(query.length > 1){
      // Handle > 1 words search
      if (/\s/.test(query)) {
        const spaceQuery = query.split(' ')

        for (let index = 0; index < spaceQuery.length; index++) {
          const el = spaceQuery[index]

          if( (el !== "") && (index === spaceQuery.length - 1) ){
            prevStateSearch = this.props.shelves.search

            const searchBooks = prevStateSearch.filter((c) => (
              c.title.toLowerCase().includes(el.toLowerCase())
            ))
            this.props.onAssignSearchState(searchBooks)
          }
        }
      } else {
        this.props.onSearch(query)
      }
    }else{
      this.props.onAssignSearchState([])
    }
  }

  render() {
    const { shelves, onUpdateShelf, onBack } = this.props

    const books = shelves.search

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => onBack() }>Close</button>
          <div className="search-books-input-wrapper">

            <input type="text" placeholder="Search by title or author - Search Terms" onChange={(e) => this.updateQuery(e)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ListComponents
            selectedShelves={books}
            shelves={shelves}
            onUpdateShelf = {onUpdateShelf}
            />
        </div>
      </div>
    )
  }
}

export default ListPage
