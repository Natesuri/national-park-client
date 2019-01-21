import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import ParkItem from './ParkItem'

class Favorites extends Component {
  constructor() {
    super()

    this.state = {}
  }

  componentDidMount () {
    // if favorite parks is empty, go fetch them!
  }

  render () {

    const { parks, updateParks } = this.props

    return (
      <React.Fragment>
        <ul>
          { parks.map((park, parkIndex) => (
            <ParkItem key={ parkIndex } park={ park } updateParks={ updateParks } />
          )) }
        </ul>
      </React.Fragment>
    )
  }
}

export default Favorites
