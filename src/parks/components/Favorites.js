import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { showFavorites } from '../parksApi'
import ParkItem from './ParkItem'

class Favorites extends Component {
  constructor() {
    super()

    this.state = {}
  }

  componentDidMount () {
    const { favoriteParksData, setFavorites, user } = this.props

    showFavorites(user)
      .then(res => res.json())
      .then(res => {
        setFavorites({favoriteParksData: res.favoriteParksData})
        return res
      })
      .then(res => console.log(favoriteParksData))
      .catch(console.error)


  }

  render () {

    const { favoriteParksData, setFavorites } = this.props

    return (
      <React.Fragment>
        <ul>
          { favoriteParksData &&
            favoriteParksData.map((park, parkIndex) => (
              <ParkItem key={ parkIndex } park={ park } setFavorites={ setFavorites } />
            )) }
        </ul>
      </React.Fragment>
    )
  }
}

export default Favorites
